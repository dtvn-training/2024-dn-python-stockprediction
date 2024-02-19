import classes from "./Predict.module.css";

interface PredictProps {
  content: string;
}
const Predict: React.FC<PredictProps> = ({ content }) => {
  return (
    <div className={classes.predict}>
      <div className={classes.chartpredict}>
        <img src="..\assets\trend.png" alt="" />
      </div>
      <div className={classes.contentpredict}>
        <span className={classes.content}>{content}</span>
      </div>
    </div>
  );
};
export default Predict;
