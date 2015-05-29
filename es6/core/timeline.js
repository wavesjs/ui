const ns = require('./namespace');
const TimeContext = require('./time-context');
const Surface  = require('../interactions/surface');
const Keyboard = require('../interactions/keyboard');
const Layer = require('./layer');

/**
 *  @class Timeline
 */
class Timeline {
  /**
   *  Creates a new Timeline
   *  @param params {Object} an object to override defaults parameters
   */
  constructor(params = {}) {
    this._defaults = {
      width: 1000,
      duration: 60
    };

    // public attributes
    this.params = Object.assign({}, this._defaults, params);
    this.layers = [];
    this.categorizedLayers = {}; // group layer by categories
    this.context = null;
    // private attributes
    this._state = null;
    this._containers = {};
    this._layerContainerMap = new Map();
    this._handleEvent = this._handleEvent.bind(this);

    this._createTimeContext();
    this._createInteraction(Keyboard, 'body');
  }

  /**
   *  Change the state of the timeline, `States` are the main entry point between
   *  application logic, interactions, ..., and the library
   *  @param state {BaseState} the state in which the timeline must be setted
   */
  setState(state) {
    if (this._state) { this._state.exit(); }
    this._state = state;
    this._state.enter();
  }

  /**
   *  @private
   *  The callback that is used to listen to interactions modules
   *  @params e {Event} a custom event generated by interaction modules
   */
  _handleEvent(e) {
    if (!this._state) { return; }
     console.log(e);
    this._state.handleEvent(e);
  }

  /**
   *  Factory method to add interaction modules the timeline should listen to
   *  by default, the timeline listen to Keyboard, and instance a Surface on each
   *  container
   *  @param ctor {EventSource} the contructor of the interaction module to instanciate
   *  @param el {DOMElement} the DOM element to bind to the EventSource module
   */
  _createInteraction(ctor, el) {
    const interaction = new ctor(el);
    interaction.on('event', this._handleEvent);
  }

  /**
   *  Creates a new TimeContext for the visualisation, this `TimeContext`
   *  will be at the top of the `TimeContext` tree
   */
  _createTimeContext() {
    const duration = this.params.duration;
    const width = this.params.width;

    const xScale = d3.scale.linear()
      .domain([0, duration])
      .range([0, width]);

    this.context = new TimeContext();
    this.context.duration =  duration;
    this.context.xScale = xScale;
  }

  get xScale() {
    return this.context.xScale;
  }

  /**
   *  Adds a `Layer` to the Timeline
   *  @param layer {Layer} the layer to register
   *  @param containerId {String} a valid id of a previsouly registered container
   *  @param category {String} insert the layer into some user defined category
   *  @param context {TimeContext} a `TimeContext` the layer is associated with
   *      if null given, a new `TimeContext` will be created for the layer
   */
  add(layer, containerId, category = 'default', context = null) {
    const layerContext = context || new TimeContext(this.context);
    layer.setContext(layerContext);

    this._layerContainerMap.set(layer, containerId);
    this.layers.push(layer);

    if (!this.categorizedLayers[category]) {
      this.categorizedLayers[category] = [];
    }

    this.categorizedLayers[category].push(layer);
  }

  /**
   *  Remove a layer from the timeline
   *  @param layer {Layer} the layer to remove
   */
  remove(layer) {

  }

  /**
   *  Returns an array of layers given some category
   *  @param category {String} name of the category
   *  @return {Array} an array of layers which belongs to the category
   */
  getLayers(category = 'default') {
    return this.categorizedLayers[category] || [];
  }

  /**
   *  Register a container and prepare the DOM svg element for the timeline's layers
   *  @param id {String} a user defined id for the container
   *  @param el {DOMElement} the DOMElement to use as a container
   *  @param options {Object} the options to apply to the container
   */
  registerContainer(id, el, options = {}) {
    const width = this.params.width;
    const height = options.height || 120;

    const svg = document.createElementNS(ns, 'svg');
    svg.setAttributeNS(null, 'width', width);
    svg.setAttributeNS(null, 'height', height);
    svg.setAttributeNS(null, 'viewbox', `0 0 ${width} ${height}`);

    const defs = document.createElementNS(ns, 'defs');

    const layoutGroup = document.createElementNS(ns, 'g');
    layoutGroup.classList.add('layout');

    const interactionsGroup = document.createElementNS(null, 'g');
    interactionsGroup.classList.add('interactions');

    svg.appendChild(defs)
    svg.appendChild(layoutGroup)
    svg.appendChild(interactionsGroup);

    el.appendChild(svg);

    this._containers[id] = { layoutGroup, interactionsGroup, DOMElement: el };
    this._createInteraction(Surface, svg);
  }

  /**
   *  Render all the layers in the timeline
   */
  render() {
    this.layers.forEach((layer) => {
      const containerId = this._layerContainerMap.get(layer);
      const layout = this._containers[containerId].layoutGroup;

      layout.appendChild(layer.render());
    });
  }

  /**
   *  Draw all the layers in the timeline
   */
  draw(layerOrCategory = null) {
    let layers = null;

    if (typeof layerOrCategory === 'string') {
      layers = this.getLayers(layerOrCategory);
    } else if (layerOrCategory instanceof Layer) {
      layers = [layerOrCategory];
    } else {
      layers = this.layers;
    }

    this.layers.forEach((layer) => layer.draw());
  }

  /**
   *  Update all the layers in the timeline
   *  @TODO accept several `layers` or `categories` as arguments ?
   */
  update(layerOrCategory = null) {
    let layers = null;

    if (typeof layerOrCategory === 'string') {
      layers = this.getLayers(layerOrCategory);
    } else if (layerOrCategory instanceof Layer) {
      layers = [layerOrCategory];
    } else {
      layers = this.layers;
    }

    layers.forEach((layer) => layer.update());
  }
}

module.exports = Timeline;