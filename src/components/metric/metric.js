const Metric = ({ metric }) => {
    return (
      <div className="metric">
        <h3>Metric:</h3>
        <p>{metric.toFixed(2)}</p>
      </div>
    );
  };
  
  export default Metric;