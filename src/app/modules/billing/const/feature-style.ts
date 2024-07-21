import {Fill, Stroke, Style} from "ol/style";

const SELECTED_FEATURE_STYLE = new Style({
  fill: new Fill({
    color: 'rgb(37, 99, 235, 0.4)',
  }),
  stroke: new Stroke({
    color: 'rgba(255, 255, 255, 1)',
    width: 2,
  }),
});

export {
  SELECTED_FEATURE_STYLE,
}
