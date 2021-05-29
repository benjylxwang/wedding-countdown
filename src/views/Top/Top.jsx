import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ImageCardCountdown from "components/ImageCardCountdown";
import endtime from "./time";

const Top = ({ frontmatter }) => {
  const [days, setDays] = useState(0);
  const [hrs, setHrs] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [ms, setMS] = useState(0);
  const [married, setMarried] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      let s;
      if (now <= endtime) {
        s = endtime - now;
        setMarried(false);
      } else {
        s = now - endtime;
        setMarried(true);
      }

      const msL = s % 1000;
      s = (s - msL) / 1000;
      const secsL = s % 60;
      s = (s - secsL) / 60;
      const minsL = s % 60;
      s = (s - minsL) / 60;
      const hrsL = s % 24;
      s = (s - hrsL) / 24;
      const daysL = s;

      setDays(daysL);
      setHrs(hrsL);
      setMins(minsL);
      setSecs(secsL);
      setMS(msL);
    }, 1);
    return () => clearInterval(interval);
  }, []);

  if (!frontmatter) {
    return null;
  }

  const {
    subheader,
    subheaderMarried,
    imageFileName,
    jumpToAnchorText,
    daysText,
    hoursText,
    minutesText,
    secondsText,
    msText,
  } = frontmatter;

  const countdown = (
    <div id="countdown">
      <div id="days" className="countdown_number">
        <p className="number">{days}</p>
        <p>{daysText}</p>
      </div>
      <div id="hrs" className="countdown_number">
        <p className="number">{hrs}</p>
        <p>{hoursText}</p>
      </div>
      <div id="mins" className="countdown_number">
        <p className="number">{mins}</p>
        <p>{minutesText}</p>
      </div>
      <div id="secs" className="countdown_number">
        <p className="number">{secs}</p>
        <p>{secondsText}</p>
      </div>
      <div id="ms" className="countdown_number">
        <p className="number">{ms}</p>
        <p>{msText}</p>
      </div>
    </div>
  );

  const imageCountdown = (
    <ImageCardCountdown
      imageFileName={imageFileName}
      countdown={countdown}
      subheader={married ? subheaderMarried : subheader}
      jumpToAnchorText={jumpToAnchorText}
    />
  );

  return imageCountdown;
};

Top.propTypes = {
  frontmatter: PropTypes.object.isRequired,
};

export default Top;
