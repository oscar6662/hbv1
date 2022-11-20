import { Button, message, Modal } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavBar } from '../../components/Navbar/NavBar';
import { authSelector } from '../../stores/auth.slice';
import {
  FlexDiv,
  SpaceBetweenDiv,
} from '../../components/ds/Containers/containers';
import { colors } from '../../components/ds/Colors/colors';
import { Heading3 } from '../../components/ds/Texts/headings';

type ParentPageProps = {
  column?: boolean;
};

const today = new Date().getUTCDate();

const ParentPage = (props: ParentPageProps) => {
  const [loading, setLoading] = useState(false);
  const [childId, setChildId] = useState(null);
  const [dayReport, setDayReport]: any = useState(null);

  const { children }: any = useSelector(authSelector);

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
      title: 'Ertu viss?',
      async onOk() {
        let result;

        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(childId),
        };

        try {
          setLoading(true);
          result = await fetch(`/api/notifysickleave`, options);

          if (!result.ok) {
            message.error(
              'Eitthvað gekk ekki upp, hafðu samband við dagforeldri'
            );
            setLoading(false);
          } else {
            message.success('Tókst, batakveðjur!');
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        } catch (err) {
          message.error('Óþekkt villa');
          setLoading(false);
        }
      },
      onCancel() {
        setLoading(false);
        console.info('Hætt við');
      },
    });
  };

  return (
    <>
      <NavBar isOnMyPage />

      <FlexDiv fullWidth justifyCenter padding={36}>
        <h1>Heimasvæði foreldris!</h1>
      </FlexDiv>
      <FlexDiv justifyCenter column>
        <FlexDiv
          backgroundColor={colors.heavyMetalLight}
          minWidth={1000}
          border={colors.heavyMetalSlightlyLight}
          borderRadius={5}
          dropShadowBelow
          padding={16}
          gap={16}
        >
          {children?.map((child: any) => {
            return (
              <SpaceBetweenDiv
                column
                minHeight={250}
                border={colors.heavyMetal}
                borderRadius={5}
                padding={16}
              >
                <h2>{child.firstName}</h2>
                <FlexDiv column gap={4}>
                  <Button
                    className="navMenuItem"
                    type="primary"
                    size="large"
                    onClick={() => handleNotify(child.id)}
                    disabled={
                      today === new Date(child.sicknessDay).getUTCDate()
                    }
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
                    <h3 style={{ color: 'red' }}>Veikindi</h3>
                  )}
                </FlexDiv>
              </SpaceBetweenDiv>
            );
          })}
        </FlexDiv>
        <FlexDiv>
          {dayReport != null && (
            <FlexDiv column>
              <Heading3>
                Day Report fyrir:{' '}
                <b>{children.find((x: any) => x.id === childId).firstName}</b>
              </Heading3>
              <p>{dayReport.comment}</p>
            </FlexDiv>
          )}
        </FlexDiv>
      </FlexDiv>
    </>
  );
};

export default ParentPage;
