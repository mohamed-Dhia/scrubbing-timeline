import * as PropTypes from "prop-types";
import React, { useState } from "react";
import ReactAce from "react-ace";
import "ace-builds/src-noconflict/theme-monokai";
import "./styles/style.css";

const { arrayOf, exact, number, oneOf, string } = PropTypes




window.ace.config.set(
    "basePath",
    "https://cdn.jsdelivr.net/npm/ace-builds@1.4.13/src-noconflict/"
);

const Timeline = ({ timelineArray, duration, language = "javascript" }) => {

    const [focusedAction, setFocusedAction] = useState(timelineArray?.[0]);

    return (
        <div className="timeline-wrapper">
            <ReactAce
                mode={focusedAction?.lang ?? language} // if there's no lang in focusedAction or language it will default to javascript
                theme="monokai"
                name="brace-editor"
                style={{ width: timelineArray ? "calc(100% + 3px)" : "100%" }}
                tabSize={4}
                readOnly={true}
                value={focusedAction?.code ?? ""}
            />
            <div className="timeline-bar">
                {timelineArray && timelineArray.map((ta, i) => (
                    <div className={`timeline-item ${ta.actionType !== "PASTE" ? "white" : "red"}`} key={`${ta.lang}-${i}`} style={{ left: (ta.time / duration) * 100 + "%" }} onClick={() => setFocusedAction(timelineArray[i])}>
                        <div className="timeslot">
                            <p>{ta.time}s</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


const TimelineType = exact({
    actionType: oneOf(["PASTE",
        "TEST",
        "TYPE"]).isRequired,
    code: string.isRequired,
    time: number.isRequired,
    lang: string.isRequired
})

Timeline.propTypes = {
    timelineArray: arrayOf(TimelineType).isRequired,
    duration: number.isRequired,
    language: string
}


export default Timeline;