import { Button, message, Modal, Switch } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavBar } from "../../components/Navbar/NavBar";
import { authSelector } from "../../stores/auth.slice";
import {FlexDiv} from "../../components/ds/Containers/containers";
import { Heading3 } from "../../components/ds/Texts/headings";

type Props = {};

const today = new Date().getUTCDate();

const ParentPage = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [childId, setChildId] = useState(null);
  const [dayReport, setDayReport]: any = useState(null);

  const { userName, type, userId, children }: any = useSelector(authSelector);

  const getDayReport = async (childId: any) => {
    try {
      const result = await fetch(`/api/getdayreport/${childId}`);
      if (result.ok) {
        const json = await result.json();
        setDayReport(json);
        setChildId(childId);
      }
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const handleNotify = (childId: any) => {
    Modal.confirm({
      title: "Ertu viss?",
      async onOk() {
        let result;

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(childId),
        };

        try {
          result = await fetch(`/api/notifysickleave`, options);

          if (!result.ok) {
            message.error(
              "Eitthvað gekk ekki upp, hafðu samband við dagforeldri"
            );
            setLoading(false);
          } else {
            message.success("Tókst, batakveðjur!");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        } catch (err) {
          message.error("Óþekkt villa");
          setLoading(false);
        }
      },
      onCancel() {
        setLoading(false);
        console.info("Hætt við");
      },
    });
  };

  return (
    <>
      <NavBar isOnMyPage />

      <div style={{ textAlign: "center", margin: "50px" }}>
        <h1>Heimasvæði foreldris!</h1>
      </div>

      <div className="searchComponent">
        <div className="searchContentContainer">
          {children?.map((child: any) => {
            return (
              <div
                key={`child-${child.id}`}
                style={{
                  height: "300px",
                  width: "200px",
                  padding: "20px",
                  border: "dotted 1px black",
                  borderRadius: "20px",
                  margin: "10px",
                }}
              >
                <h2>{child.firstName}</h2>

                <Button
                  className="navMenuItem"
                  type="primary"
                  size="large"
                  onClick={() => handleNotify(child.id)}
                  disabled={today === new Date(child.sicknessDay).getUTCDate()}
                >
                  Tilkynna veikindi
                </Button>
                <Button
                  className="navMenuItem"
                  type="primary"
                  size="large"
                  onClick={() => getDayReport(child.id)}
                >
                  Ná dayreport
                </Button>
                {new Date(child.sicknessDay).getUTCDate() === today && (
                  <h3 style={{ color: "red" }}>Veikindi</h3>
                )}
              </div>
            );
          })}
        </div>
        <FlexDiv>
        {dayReport != null && (
            <FlexDiv column>
              <Heading3>
                Day Report fyrir:{" "}
                <b>{children.find((x: any) => x.id === childId).firstName}</b>
              </Heading3>

              <p>{dayReport.comment}</p>
              </FlexDiv>
          )}
        </FlexDiv>
      </div>
    </>
  );
};

export default ParentPage;
