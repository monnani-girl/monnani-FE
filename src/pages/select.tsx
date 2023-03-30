import styled from 'styled-components';
import { useState } from 'react';
import { Line } from 'rc-progress';
import headerLogo from '../assets/header.png';
import FirstStep from '../components/selectItem/FirstStep';
import SecondStep from '../components/selectItem/SecondStep';
import ThirdStep from '../components/selectItem/ThirdStep';
import FourthStep from '../components/selectItem/FourthStep';
import { useRecoilValue} from 'recoil';
import { firstState, secondState, thirdState, fourthState } from "../atoms";

interface ButtonProps {
  label?: string;
  prev?: boolean;
  onClick?: () => void;
}

const STEP = 5;
const PERCENTAGE = ~~(100 / STEP);

const Select = () => {
  const [currentStep, setCurrentStep] = useState<number>(PERCENTAGE);
  const firstValue = useRecoilValue(firstState);
  const secondValue = useRecoilValue(secondState);
  const thirdValue = useRecoilValue(thirdState);
  const fourthValue = useRecoilValue(fourthState);

  const handlePrevStep = () => {
    setCurrentStep(
      currentStep > PERCENTAGE ? currentStep - PERCENTAGE : currentStep
    );
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep < 100 ? currentStep + PERCENTAGE : currentStep);
  };

  return (
    <Container>
      <HeaderLogo src={headerLogo} />
      <Line
        percent={currentStep}
        strokeWidth={3}
        trailWidth={3}
        strokeColor="#379100"
        trailColor="#e3f2ff"
        style={{ width: '333px', marginTop: '46px' }}
      />
      {currentStep === 20 && (
          <FirstStep />
      )}
      {currentStep === 40 && (
          <SecondStep />
      )}
      {currentStep === 60 && (
          <ThirdStep />
      )}
      {currentStep === 80 && (
          <FourthStep />
      )}
      {currentStep === 100 && (
        <>
          console.log(`{firstValue}, {secondValue}, {thirdValue}, {fourthValue}`);
        </>
      )}
      <BtnContainer>
        <Button label="Prev Step" prev onClick={handlePrevStep}>
          이전
        </Button>
        <Button label="Next Step" onClick={handleNextStep}>
          다음
        </Button>
      </BtnContainer>
    </Container>
  );
};

export default Select;

const HeaderLogo = styled.img`
  width: 17px;
`;

const ButtonType = {
  bgcolor: {
    prev: '#F5F2F0',
    next: 'rgba(245,242,240,0.5)',
  },
  color: {
    prev: '#525463',
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
    props.prev ? ButtonType.bgcolor.prev : ButtonType.bgcolor.next};
  color: ${(props) =>
    props.prev ? ButtonType.color.prev : ButtonType.color.next};
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  line-height: 52px;
  text-align: center;
  border-radius: 48px;
  font-family: 'Gmarket Sans';
  font-style: normal;
  font-weight: 400;
`;