<template>
  <div
    ref="gantt"
    :style="styleData"
    @mousewheel.prevent="ganttScrollHandler"
    @DOMMouseScroll.prevent="ganttScrollHandlerFireFox"
  ></div>
</template>

<script>
// @ is an alias to /src
import gantt from "dhtmlx-gantt";
import "dhtmlx-gantt/codebase/dhtmlxgantt.css";
import { substituteTimeHandle, timeStretch } from "@/utils/tools.js";
export default {
  name: "gantt-view",
  props: {
    tasks: {
      type: Object,
      default: () => ({
        data: [],
      }),
    },
  },
  data() {
    return {
      styleData: "",
      // tasks: {
      //   data: [
      //     {
      //       id: 1,
      //       text: "作战任务1",
      //       start_date: "22-01-2021",
      //       end_date: "24-01-2021",
      //     },
      //     {
      //       id: 2,
      //       text: "a",
      //       start_date: "22-01-2021",
      //       end_date: "20-01-2021",
      //     },
      //   ],
      // },
      // 滚动定时器
      scrollTimer: null,
    };
  },
  watch: {
    tasks: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          setTimeout(() => {
            gantt.clearAll();
            this.styleData =
              "width: 400px;" +
              `height: ${52 * (this.tasks.data.length + 1)}px;`;
            gantt.parse(this.tasks);
          });
        });
      },
      // immediate: true,
    },
  },
  methods: {
    initGantt() {
      gantt.config.readyonly = false; // 只读：（设置只读，并重新定义columns，就不会有‘+’在列中，也不能填加删除任务）
      gantt.config.show_grid = false;
      gantt.config.drag_move = false; // 不允许拖动条形图
      gantt.config.drag_resize = false; // 不允许拖拽条形图两端
      gantt.config.show_links = false; // 隐藏连接线
      gantt.config.show_progress = false; // 在条形图上不显示进度
      gantt.config.scroll_size = "unset"; // 滚动条的宽高
      // gantt.config.task_height = 10; // 条形图的高度
      gantt.config.bar_height = 20;
      gantt.config.row_height = 52; // 行高
      gantt.config.task_date = "%m-%d-%Y";
      gantt.config.duration_unit = "month"; // 工期计算基本单位
      gantt.config.scale_height = 52; // 头部高度
      gantt.config.date_scale = "%Y年%m月"; // 日期尺度按年
      gantt.config.subscales = [{ unit: "day", step: 1, date: "%d日" }];
      gantt.plugins({
        tooltip: true, // 鼠标划过任务显示明细
      });
      gantt.templates.tooltip_text = (start, end, task) => {
        const output = `
         <div class="tooltip_item">
         <span class="tooltip_label">开始时间：</span>
         <span class="tooltip_value">${substituteTimeHandle(
           task.start_date
         )}</span></div>
            <div class="tooltip_item">
         <div class="tooltip_item">
         <span class="tooltip_label">结束时间：</span>
         <span class="tooltip_value">${timeStretch(
           substituteTimeHandle(task.end_date),
           1
         )}</span></div>
        `;
        return output;
      };
      this.styleData =
        "width: 400px;" + `height: ${52 * (this.tasks.data.length + 1)}px;`;
      gantt.init(this.$refs.gantt);
      gantt.parse(this.tasks);
    },
    ganttScrollHandler(e) {
      let direction = e.deltaY > 0 ? "down" : "up";
      let sPos = gantt.getScrollState(); // {x:58,y:180}
      if (direction === "down") {
        let curPosX = sPos.x;
        let endPosX = 30;
        let timer = setInterval(() => {
          curPosX += 15;
          if (curPosX - sPos.x <= endPosX) {
            gantt.scrollTo(curPosX, null);
          } else {
            clearInterval(timer);
            timer = null;
          }
        }, 5);
      } else {
        let curPosX = sPos.x;
        let endPosX = 30;
        let timer = setInterval(() => {
          curPosX -= 15;
          if (sPos.x - curPosX <= endPosX && curPosX >= 0) {
            gantt.scrollTo(curPosX, null);
          } else {
            clearInterval(timer);
            timer = null;
          }
        }, 5);
      }
    },
    ganttScrollHandlerFireFox(e) {
      let direction = e.detail > 0 ? "down" : "up";
      let sPos = gantt.getScrollState(); // {x:58,y:180}
      if (direction === "down") {
        let curPosX = sPos.x;
        let endPosX = 30;
        let timer = setInterval(() => {
          curPosX += 15;
          if (curPosX - sPos.x <= endPosX) {
            gantt.scrollTo(curPosX, null);
          } else {
            clearInterval(timer);
            timer = null;
          }
        }, 5);
      } else {
        let curPosX = sPos.x;
        let endPosX = 30;
        let timer = setInterval(() => {
          curPosX -= 15;
          if (sPos.x - curPosX <= endPosX && curPosX >= 0) {
            gantt.scrollTo(curPosX, null);
          } else {
            clearInterval(timer);
            timer = null;
          }
        }, 5);
      }
    }
  },
  mounted() {
    this.initGantt();
  },
  beforeDestroy() {
    gantt.clearAll();
  },
};
</script>
<style lang="scss">
.gantt_container {
  border: unset !important;
  background-color: transparent !important;
}
.gantt_task .gantt_task_scale .gantt_scale_cell {
  color: var(--color-white);
  border-right: unset;
  // border-right: 1px solid var(--background-color-primary-rgba);
}
.gantt_grid_scale .gantt_grid_head_cell {
  color: var(--color-white);
}
.gantt_grid_scale,
.gantt_task_scale {
  border-bottom: unset;
  background: transparent;
}
.gantt_scale_line {
  border-top: unset;
}
.gantt_task_cell {
  border-right: unset;
}
.gantt_row,
.gantt_task_row {
  border-bottom: unset;
  background: transparent;
  &.odd {
    background: transparent;
  }
  &.gantt_selected {
    background-color: unset;
  }
}
.gantt_task_line {
  background-color: var(--color-primary);
  border: unset;
  &:first-child {
    .gantt_scale_cell {
      left: 50%;
    }
  }
}
.gantt_task_scale {
  .gantt_scale_line {
    &:nth-child(2) {
      .gantt_scale_cell {
        &:first-child {
          border-left: 1px solid rgba(24, 140, 255, 0.4);
        }
        border-right: 1px solid rgba(24, 140, 255, 0.4);
      }
    }
  }
}
</style>
