"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _inherits = require("babel-runtime/helpers/inherits")["default"];

var _createClass = require("babel-runtime/helpers/create-class")["default"];

var BaseBehavior = require("./base-behavior");

var SegmentBehavior = (function (_BaseBehavior) {
  function SegmentBehavior() {
    _classCallCheck(this, SegmentBehavior);

    if (_BaseBehavior != null) {
      _BaseBehavior.apply(this, arguments);
    }
  }

  _inherits(SegmentBehavior, _BaseBehavior);

  _createClass(SegmentBehavior, {
    edit: {
      // constructor() {}

      value: function edit(context, shape, datum, dx, dy, target) {
        var action = "move";
        var classList = target.classList;

        if (classList.contains("handler") && classList.contains("left")) {
          action = "resizeLeft";
        } else if (classList.contains("handler") && classList.contains("right")) {
          action = "resizeRight";
        }

        this["_" + action](context, shape, datum, dx, dy, target);
      }
    },
    _move: {
      value: function _move(context, shape, datum, dx, dy, target) {
        var layerHeight = context.params.height;
        // current values
        var x = context.xScale(shape.x(datum));
        var y = context.yScale(shape.y(datum));
        var height = context.yScale(shape.height(datum));
        // target values
        var targetX = Math.max(x + dx, 0);
        var targetY = y - dy;

        // lock in layer's y axis
        if (targetY < 0) {
          targetY = 0;
        } else if (targetY + height > layerHeight) {
          targetY = layerHeight - height;
        }

        shape.x(datum, context.xScale.invert(targetX));
        shape.y(datum, context.yScale.invert(targetY));
      }
    },
    _resizeLeft: {
      value: function _resizeLeft(context, shape, datum, dx, dy, target) {
        // current values
        var x = context.xScale(shape.x(datum));
        var width = context.xScale(shape.width(datum));
        // target values
        var maxTargetX = x + width;
        var targetX = x + dx < maxTargetX ? Math.max(x + dx, 0) : x;
        var targetWidth = targetX !== 0 ? Math.max(width - dx, 1) : width;

        shape.x(datum, context.xScale.invert(targetX));
        shape.width(datum, context.xScale.invert(targetWidth));
      }
    },
    _resizeRight: {
      value: function _resizeRight(context, shape, datum, dx, dy, target) {
        // current values
        var width = context.xScale(shape.width(datum));
        // target values
        var targetWidth = Math.max(width + dx, 1);

        shape.width(datum, context.xScale.invert(targetWidth));
      }
    }
  });

  return SegmentBehavior;
})(BaseBehavior);

module.exports = SegmentBehavior;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVzNi9iZWhhdmlvcnMvc2VnbWVudC1iZWhhdmlvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLElBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOztJQUUxQyxlQUFlO1dBQWYsZUFBZTswQkFBZixlQUFlOzs7Ozs7O1lBQWYsZUFBZTs7ZUFBZixlQUFlO0FBR25CLFFBQUk7OzthQUFBLGNBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUU7QUFDMUMsWUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3BCLFlBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7O0FBRW5DLFlBQUksU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQy9ELGdCQUFNLEdBQUcsWUFBWSxDQUFDO1NBQ3ZCLE1BQU0sSUFBSSxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDdkUsZ0JBQU0sR0FBRyxhQUFhLENBQUM7U0FDeEI7O0FBRUQsWUFBSSxPQUFLLE1BQU0sQ0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7T0FDM0Q7O0FBRUQsU0FBSzthQUFBLGVBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUU7QUFDM0MsWUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7O0FBRTFDLFlBQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3pDLFlBQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ3pDLFlBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOztBQUVuRCxZQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDbEMsWUFBSSxPQUFPLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7O0FBR3JCLFlBQUksT0FBTyxHQUFHLENBQUMsRUFBRTtBQUNmLGlCQUFPLEdBQUcsQ0FBQyxDQUFDO1NBQ2IsTUFBTSxJQUFJLE9BQU8sR0FBRyxNQUFNLEdBQUcsV0FBVyxFQUFFO0FBQ3pDLGlCQUFPLEdBQUcsV0FBVyxHQUFHLE1BQU0sQ0FBQTtTQUMvQjs7QUFFRCxhQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQy9DLGFBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7T0FDaEQ7O0FBRUQsZUFBVzthQUFBLHFCQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFOztBQUVqRCxZQUFNLENBQUMsR0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUM3QyxZQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7QUFFakQsWUFBSSxVQUFVLEdBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUM1QixZQUFJLE9BQU8sR0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hFLFlBQUksV0FBVyxHQUFHLE9BQU8sS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQzs7QUFFbEUsYUFBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUMvQyxhQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO09BQ3hEOztBQUVELGdCQUFZO2FBQUEsc0JBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUU7O0FBRWxELFlBQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOztBQUVqRCxZQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7O0FBRTFDLGFBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7T0FDeEQ7Ozs7U0F6REcsZUFBZTtHQUFTLFlBQVk7O0FBNEQxQyxNQUFNLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQyIsImZpbGUiOiJlczYvYmVoYXZpb3JzL3NlZ21lbnQtYmVoYXZpb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBCYXNlQmVoYXZpb3IgPSByZXF1aXJlKCcuL2Jhc2UtYmVoYXZpb3InKTtcblxuY2xhc3MgU2VnbWVudEJlaGF2aW9yIGV4dGVuZHMgQmFzZUJlaGF2aW9yIHtcbiAgLy8gY29uc3RydWN0b3IoKSB7fVxuXG4gIGVkaXQoY29udGV4dCwgc2hhcGUsIGRhdHVtLCBkeCwgZHksIHRhcmdldCkge1xuICAgIGxldCBhY3Rpb24gPSAnbW92ZSc7XG4gICAgY29uc3QgY2xhc3NMaXN0ID0gdGFyZ2V0LmNsYXNzTGlzdDtcblxuICAgIGlmIChjbGFzc0xpc3QuY29udGFpbnMoJ2hhbmRsZXInKSAmJiBjbGFzc0xpc3QuY29udGFpbnMoJ2xlZnQnKSkge1xuICAgICAgYWN0aW9uID0gJ3Jlc2l6ZUxlZnQnO1xuICAgIH0gZWxzZSBpZiAoY2xhc3NMaXN0LmNvbnRhaW5zKCdoYW5kbGVyJykgJiYgY2xhc3NMaXN0LmNvbnRhaW5zKCdyaWdodCcpKSB7XG4gICAgICBhY3Rpb24gPSAncmVzaXplUmlnaHQnO1xuICAgIH1cblxuICAgIHRoaXNbYF8ke2FjdGlvbn1gXShjb250ZXh0LCBzaGFwZSwgZGF0dW0sIGR4LCBkeSwgdGFyZ2V0KTtcbiAgfVxuXG4gIF9tb3ZlKGNvbnRleHQsIHNoYXBlLCBkYXR1bSwgZHgsIGR5LCB0YXJnZXQpIHtcbiAgICBjb25zdCBsYXllckhlaWdodCA9IGNvbnRleHQucGFyYW1zLmhlaWdodDtcbiAgICAvLyBjdXJyZW50IHZhbHVlc1xuICAgIGNvbnN0IHggPSBjb250ZXh0LnhTY2FsZShzaGFwZS54KGRhdHVtKSk7XG4gICAgY29uc3QgeSA9IGNvbnRleHQueVNjYWxlKHNoYXBlLnkoZGF0dW0pKTtcbiAgICBjb25zdCBoZWlnaHQgPSBjb250ZXh0LnlTY2FsZShzaGFwZS5oZWlnaHQoZGF0dW0pKTtcbiAgICAvLyB0YXJnZXQgdmFsdWVzXG4gICAgbGV0IHRhcmdldFggPSBNYXRoLm1heCh4ICsgZHgsIDApO1xuICAgIGxldCB0YXJnZXRZID0geSAtIGR5O1xuXG4gICAgLy8gbG9jayBpbiBsYXllcidzIHkgYXhpc1xuICAgIGlmICh0YXJnZXRZIDwgMCkge1xuICAgICAgdGFyZ2V0WSA9IDA7XG4gICAgfSBlbHNlIGlmICh0YXJnZXRZICsgaGVpZ2h0ID4gbGF5ZXJIZWlnaHQpIHtcbiAgICAgIHRhcmdldFkgPSBsYXllckhlaWdodCAtIGhlaWdodFxuICAgIH1cblxuICAgIHNoYXBlLngoZGF0dW0sIGNvbnRleHQueFNjYWxlLmludmVydCh0YXJnZXRYKSk7XG4gICAgc2hhcGUueShkYXR1bSwgY29udGV4dC55U2NhbGUuaW52ZXJ0KHRhcmdldFkpKTtcbiAgfVxuXG4gIF9yZXNpemVMZWZ0KGNvbnRleHQsIHNoYXBlLCBkYXR1bSwgZHgsIGR5LCB0YXJnZXQpIHtcbiAgICAvLyBjdXJyZW50IHZhbHVlc1xuICAgIGNvbnN0IHggICAgID0gY29udGV4dC54U2NhbGUoc2hhcGUueChkYXR1bSkpO1xuICAgIGNvbnN0IHdpZHRoID0gY29udGV4dC54U2NhbGUoc2hhcGUud2lkdGgoZGF0dW0pKTtcbiAgICAvLyB0YXJnZXQgdmFsdWVzXG4gICAgbGV0IG1heFRhcmdldFggID0geCArIHdpZHRoO1xuICAgIGxldCB0YXJnZXRYICAgICA9IHggKyBkeCA8IG1heFRhcmdldFggPyBNYXRoLm1heCh4ICsgZHgsIDApIDogeDtcbiAgICBsZXQgdGFyZ2V0V2lkdGggPSB0YXJnZXRYICE9PSAwID8gTWF0aC5tYXgod2lkdGggLSBkeCwgMSkgOiB3aWR0aDtcblxuICAgIHNoYXBlLngoZGF0dW0sIGNvbnRleHQueFNjYWxlLmludmVydCh0YXJnZXRYKSk7XG4gICAgc2hhcGUud2lkdGgoZGF0dW0sIGNvbnRleHQueFNjYWxlLmludmVydCh0YXJnZXRXaWR0aCkpO1xuICB9XG5cbiAgX3Jlc2l6ZVJpZ2h0KGNvbnRleHQsIHNoYXBlLCBkYXR1bSwgZHgsIGR5LCB0YXJnZXQpIHtcbiAgICAvLyBjdXJyZW50IHZhbHVlc1xuICAgIGNvbnN0IHdpZHRoID0gY29udGV4dC54U2NhbGUoc2hhcGUud2lkdGgoZGF0dW0pKTtcbiAgICAvLyB0YXJnZXQgdmFsdWVzXG4gICAgbGV0IHRhcmdldFdpZHRoID0gTWF0aC5tYXgod2lkdGggKyBkeCwgMSk7XG5cbiAgICBzaGFwZS53aWR0aChkYXR1bSwgY29udGV4dC54U2NhbGUuaW52ZXJ0KHRhcmdldFdpZHRoKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTZWdtZW50QmVoYXZpb3I7Il19