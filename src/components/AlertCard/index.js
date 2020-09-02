import React from "react"

import Accordion from "react-bootstrap/Accordion"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"

import Card from "react-bootstrap/Card"
import classNames from "classnames"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"

import styles from "./styles.module.css"

const AlertCard = props => {
  const severityMap = {
    0: "Severity: Fyi",
    1: "Severity: Low",
    2: "Severity: Moderate",
    3: "Severity: High",
  }

  const sevClassName = severityMap[props.severity].split(": ")[1]
  console.log("sev", sevClassName)
  // const alerts = props.alerts.filter(item => item)
  // const alertLength = alerts.length
  // const highSeverity = props.predictions.alerts.severity === 3
  // const midSeverity = props.predictions.alerts.severity === 2
  // const lowSeverity = props.predictions.alerts.severity === 1
  // const fyi = props.predictions.alerts.severity === 0

  // console.log("props", props.content)
  return (
    <Accordion>
      {/* end */}
      <Card className={styles.card}>
        <Card.Header className={styles.columns}>
          <div
            className={classNames(
              styles.alertColumn,
              styles.rectangle,
              styles[sevClassName]
            )}
          ></div>

          <div className={styles.flexGrow}>
            <p className={styles.titleText}>{props.title}</p>
            <Accordion.Toggle className={styles.caret} eventKey="0">
              <span className={styles.moreButton}>MORE</span>
            </Accordion.Toggle>
          </div>
        </Card.Header>

        <Accordion.Collapse eventKey="0">
          <div className={styles.flexCollapse}>
            <span
              className={classNames(
                styles.content,
                styles.alertColumn,
                styles.collapseRectangle,
                styles[sevClassName]
              )}
            ></span>

            <div className={styles.childCollapse}>
              <Container>
                <Row className={styles.alertRow}>
                  <p className={classNames(styles.subtitleText)}>
                    <b>Severity</b>
                    <b>:</b> {sevClassName}
                  </p>
                  <p className={styles.subtitleText}>
                    <b>Alert Category</b>
                    <b>:</b> {props.category}
                  </p>
                  <div className={classNames(styles.subtitleText)}>
                    <b>Populations Affected</b>
                    <b>:</b>{" "}
                    {props.tags.map(tag => {
                      return (
                        // <p
                        //   className={classNames(
                        //     styles.subtitleText,
                        //     styles.tag
                        //   )}
                        //   key={tag}
                        // >
                        tag
                        // </p>
                      )
                    })}
                  </div>
                </Row>

                <Row>
                  <ReactMarkdown
                    source={props.content}
                    // className={styles.textContent}
                  />
                </Row>
              </Container>
            </div>
          </div>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}

AlertCard.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  contentType: PropTypes.oneOf(["text", "markdown", "vega-lite"]).isRequired,
  severity: PropTypes.oneOf([0, 1, 2, 3]).isRequired,
  type: PropTypes.oneOf([
    "completeness",
    "accuracy",
    "timeliness",
    "consistenty",
    "accessibility",
  ]).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
}

AlertCard.defaultProps = {
  title: "OH NOESSSS!!!!",
  content: "### Info ###\n\nAHHHHHHHHH!!!!",
  contentType: "markdown",
  severity: 0,
  type: "completeness",
  tags: ["age"],
}

export default AlertCard
