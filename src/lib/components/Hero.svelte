<div class="title">
  <!-- <h1>The Team</h1> -->
  <h1>Sky<span style="color:red">X</span>perts</h1>
  <h1>UAVs Club</h1>
</div>

<style>
  .title {
    /*background-color: lightyellow;*/
    background:
      linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url("https://skyxperts-aast.github.io/Official-Website/assets/imgs/team-imgs/events/alamein-airshow/skyxpert-team.jpg")
        center/cover;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    /*align-items: center;*/
    justify-content: center;

    h1 {
      position: relative;
      color: white;
      font-family: "Bull", monospace;
      font-variation-settings: "wght" 180;
      margin: 0;
      bottom: -1.3em;
      font-size: 12em;
      /*font-size: 8.35em;*/
      /*font-synthesis: none;*/
      line-height: 1em;

      margin-left: 0.5em;
      &:nth-child(1) {
        /*margin-top: 2em;*/
      }

      &:nth-child(2) {
        /*font-size: 12em;*/
        /*line-height: 6em;*/
        /*color: red;*/
      }
    }

    &::after {
      content: "";
      position: absolute;
      z-index: 5;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        180deg,
        rgba(0, 26, 48, 0) 82.68%,
        #00162b 100%
      );
    }
  }
</style>
