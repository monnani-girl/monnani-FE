import styled from 'styled-components';
import { FormEvent, useState } from 'react';
import { Line } from 'rc-progress';
import headerLogo from '../assets/header.png';
import FirstStep from '../components/selectItem/FirstStep';
import SecondStep from '../components/selectItem/SecondStep';
import ThirdStep from '../components/selectItem/ThirdStep';
import FourthStep from '../components/selectItem/FourthStep';
import WebcamCapture from '../components/WebcamCapture';
import ImageFileUpload from '../components/ImageUpload';
import { SelectedProps } from '../api/types';
import { useNavigate } from 'react-router-dom';

interface ButtonProps {
  label?: string;
  prev?: boolean;
  onClick?: () => void;
}

const STEP = 5;
const PERCENTAGE = 100 / STEP;

const steps = ['season', 'weather', 'feel', 'travel', 'photo'];

const Select = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<number>(PERCENTAGE);
  const [uploadType, setUploadType] = useState('');

  const isActivePrevBtn = currentStep !== PERCENTAGE;
  //TODO: 다음 버튼 활성화 로직 수정 필요
  const isActiveNextBtn = currentStep !== 100;
  // Boolean(
  //   selectedState[steps[currentStep / PERCENTAGE - 1] as SelectedProps],
  // );

  const handlePrevStep = () => {
    setCurrentStep(
      currentStep > PERCENTAGE ? currentStep - PERCENTAGE : currentStep,
    );
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep < 100 ? currentStep + PERCENTAGE : currentStep);
  };

  const handleUploadBtn = (e: FormEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { value },
    } = e;
    setUploadType(value);
  };

  return (
    <Container>
      <HeaderLogo src={headerLogo} onClick={() => navigate('/')} />
      <Line
        percent={currentStep}
        strokeWidth={3}
        trailWidth={3}
        strokeColor="var(--primary)"
        trailColor="var(--progress-trail)"
        style={{ width: '333px', marginTop: '46px' }}
      />
      {currentStep === 20 && <FirstStep />}
      {currentStep === 40 && <SecondStep />}
      {currentStep === 60 && <ThirdStep />}
      {currentStep === 80 && <FourthStep />}
      {currentStep === 100 && (
        <>
          <StepTitle>나와 닮은 못난이 캐릭터를 찾아보세요</StepTitle>
          <StepSubText>얼굴이 잘리지 않은 사진을 업로드해주세요</StepSubText>
          {uploadType === 'upload' && <ImageFileUpload />}
          {uploadType === 'capture' && <WebcamCapture />}

          {!uploadType && (
            <UploadBtnContainer>
              <UploadButton value="upload" onClick={handleUploadBtn}>
                사진 업로드
              </UploadButton>
              <UploadButton
                value="capture"
                onClick={() =>
                  alert(
                    'HTTPS 보안 문제로 현재 기기에서 사용할 수 없는 기능입니다. \n업데이트 예정입니다 :)',
                  )
                }
              >
                사진 촬영
              </UploadButton>
            </UploadBtnContainer>
          )}
        </>
      )}
      <BtnContainer>
        <Button
          label="Prev Step"
          prev
          onClick={handlePrevStep}
          disabled={!isActivePrevBtn}
        >
          이전
        </Button>
        <Button
          label="Next Step"
          onClick={handleNextStep}
          disabled={!isActiveNextBtn}
        >
          다음
        </Button>
      </BtnContainer>
    </Container>
  );
};

export default Select;

const HeaderLogo = styled.img`
  width: 17px;
  cursor: pointer;
`;

const ButtonType = {
  bgcolor: {
    prev: 'var(--background)',
    next: 'rgba(245,242,240,0.5)',
  },
  color: {
    prev: 'var(--sub-black)',
    next: 'rgba(82,84,99,0.5)',
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BtnContainer = styled.div`
  display: flex;
  min-width: 486px;
  max-width: 486px;
  justify-content: space-around;
  margin: 59px 0 125px 0;
`;

const Button = styled.button<ButtonProps>`
  width: 79px;
  height: 52px;
  background-color: ${(props) =>
    props.prev
      ? ButtonType.bgcolor.prev
      : props.disabled
      ? ButtonType.bgcolor.next
      : 'rgba(55,145,0,0.08)'};
  color: ${(props) =>
    props.prev
      ? ButtonType.color.prev
      : props.disabled
      ? ButtonType.color.next
      : 'var(--primary)'};
  border: ${(props) =>
    props.prev
      ? 'none'
      : props.disabled
      ? ButtonType.bgcolor.next
      : '1px solid var(--primary)'};
  outline: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 16px;
  line-height: 52px;
  text-align: center;
  border-radius: 48px;
  font-style: normal;
  font-weight: 400;
`;

const StepTitle = styled.div`
  font-size: 24px;
  margin-top: 77px;
`;

const StepSubText = styled.div`
  font-size: 16px;
  margin-top: 10px;
  color: var(--darkgrey);
`;

const UploadButton = styled.button`
  width: 136px;
  height: 136px;
  border: 1px solid #e1e1e1;
  border-radius: 90px;
  background: var(--white);
  color: var(--secondary);
  cursor: pointer;
  font-size: 18px;
  &:hover {
    border: 2px solid var(--primary);
  }
`;

const UploadBtnContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 25px;
  margin: 80px 0 66px 0;
`;

const FindButton = styled.button`
  width: 284px;
  height: 72px;
  background-color: var(--background);
  opacity: 0.5;
  border-radius: 100px;
  color: var(--secondary);
  font-size: 24px;
  border: none;
  cursor: not-allowed;
`;
