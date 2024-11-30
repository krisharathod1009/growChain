"use client";

import { useEffect, useState } from "react";

function Advertisements() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true);

    const interval = setInterval(() => {
      setShowPopup(true);
    }, 3 * 60 * 1000); // 1 minutes in milliseconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .popup-content {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          max-width: 90%;
          max-height: 90%;
          overflow: hidden;
        }
        .popup-content img {
          max-width: 100%;
          max-height: 100%;
          border-radius: 8px;
          cursor: pointer;
        }
        .close-icon {
          position: absolute;
          top: 5px;
          right: 5px;
          font-size: 45px;
          color: #333;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
      `}</style>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <span className="close-icon" onClick={() => setShowPopup(false)}>
              ×
            </span>
            <a
              href="https://www.amazon.in/Trustbasket-Vermicompost-Organic-Enricher-Vegetables/dp/B0D73VL9Q6/ref=sr_1_1_sspa?crid=LSKHN7XIQ8OT&dib=eyJ2IjoiMSJ9.QV-0XUcfS9ZGzOzKpmUrYol0efFSEDZPYVs0OlIrNj6ufCTQXwlunB3eLhYcOI54e4e_WZMJU9Od8vsY6zfcM3F1sjiSsjumLVjgrmin9mCsiQXeYKul47vwqLaMZyC2eGRkDOJWZl-X9snugAlnf13K5Xr5Hwf7K1CAUOlj69IUawDSnrJhnx8bRV3UCMzVZ_J7Z7dtmRcF5xgh6Sb8gLsrKq-ebebXGxdkACpeyzSeJVHGar8rBhlpVOy2UVHouyOF8ZVLboAHRvtjCduztqfsk429_kvDrZkPNrga-aI.MiXHzxhV1fCEhrXSOxXN253IlJ8jPzDnHUoiV4szSr0&dib_tag=se&keywords=organic%2Bplant%2Bcompost&qid=1731214383&sprefix=organic%2Bplant%2Bcompost%2Caps%2C187&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/assets/Images/add.png" alt="Advertisement" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default Advertisements;
