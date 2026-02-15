const ConcernModal = ({
  show,
  selectedConcerns,
  setSelectedConcerns,
  generateRecommendations,
  onClose
}) => {

  if (!show) return null;

  const concerns = [
    { label: "Acne", value: "acne" },
    { label: "Dandruff", value: "dandruff" },
    { label: "Hair Fall", value: "hair fall" },
    { label: "Dry Skin", value: "dry" },
    { label: "Pigmentation", value: "pigment" },
  ];

  const handleChange = (value) => {

    setSelectedConcerns(prev =>

      prev.includes(value)
        ? prev.filter(c => c !== value)
        : [...prev, value]

    );

  };

  return (

    <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50">

      <div className="bg-white p-4 rounded shadow position-relative" style={{ width: "420px" }}>

        <h5>Tell us your concerns</h5>

        <button
          className="btn btn-sm btn-outline-dark position-absolute"
          style={{ top: 5, right: 5 }}
          onClick={onClose}
        >
          ✖
        </button>

        {concerns.map(c => (

          <div key={c.value} className="form-check">

            <input
              type="checkbox"
              checked={selectedConcerns.includes(c.value)}
              onChange={() => handleChange(c.value)}
            />

            <label>{c.label}</label>

          </div>

        ))}

        <button
          className="btn btn-dark w-100 mt-3"
          onClick={generateRecommendations}
          disabled={selectedConcerns.length === 0}
        >
          Show Recommendations
        </button>

      </div>

    </div>

  );

};

export default ConcernModal;
