import { useCallback, useState } from "react";
import { GithubIcon } from "./icons/Github";
import { InfoIcon } from "./icons/Info";

export const Info = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <a
        href="https://github.com/cristianpjensen/projective-transformation-visualisation"
        target="_blank"
        rel="noreferrer"
        style={{ position: "absolute", top: 16, left: 16 }}
      >
        <GithubIcon />
      </a>
      <button
        style={{
          position: "absolute",
          top: 16,
          right: 16,
        }}
        onClick={handleOpen}
      >
        <InfoIcon />
      </button>
      {isOpen && (
        <>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
            onClick={handleClose}
          >
            <div
              style={{
                backgroundColor: "black",
                zIndex: 2,
                maxWidth: 500,
                width: "100%",
                maxHeight: 500,
                borderRadius: 16,
                borderColor: "grey",
                borderStyle: "solid",
                borderWidth: 2,
                padding: 32,
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <h2 style={{ textAlign: "center" }}>
                Projective Transformation Visualisation
              </h2>
              <div style={{ textAlign: "justify", fontSize: 20 }}>
                <p>
                  This is an interactive visualisation of the homogeneous space
                  of a projective transformation. The projection is defined by
                  the position of the four colourful points in the image below.
                  It projects whatever is within the four points to the borders
                  of the original image.
                </p>
                <p>
                  In the three-dimensional space, the projected image is the
                  image that is only in X and Y. The other (three-dimensional)
                  image is the projected image in homogeneous space.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
