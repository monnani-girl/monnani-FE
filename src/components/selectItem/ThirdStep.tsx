import styled from 'styled-components';
import { FormEvent } from 'react';
import { useRecoilState } from 'recoil';
import { selectedAtom } from '../../atoms';

const ThirdStep = () => {
  const [selectedState, setSelectedState] = useRecoilState(selectedAtom);

  const handleSelectItem = (e: FormEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { value },
    } = e;

    setSelectedState((prev) => {
      const newObj = { ...prev, feel: value };
      return newObj;
    });
  };

  return (
    <>
      <SubTitle>지금 이 질문을 본 당신!</SubTitle>
      <Title>오늘 당신의 기분은 어떠신가요?</Title>
      <SelectContainer>
        <SelectItem
          id="1"
          value="energetic"
          onClick={handleSelectItem}
          selected={selectedState['feel'] === 'energetic'}
        >
          활기차고 에너지가 넘쳐요
        </SelectItem>
        <SelectItem
          id="2"
          value="angry"
          onClick={handleSelectItem}
          selected={selectedState['feel'] === 'angry'}
        >
          화나는 일이 있어요
        </SelectItem>
        <SelectItem
          id="3"
          value="tired"
          onClick={handleSelectItem}
          selected={selectedState['feel'] === 'tired'}
        >
          힐링이 필요해요
        </SelectItem>
        <SelectItem
          id="4"
          value="normal"
          onClick={handleSelectItem}
          selected={selectedState['feel'] === 'normal'}
        >
          대체적으로 평범해요
        </SelectItem>
      </SelectContainer>
    </>
  );
};

export default ThirdStep;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: var(--sub-black);

  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  margin-top: 48px;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  margin: 10px 0 34px 0;

  color: var(--black);
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectItem = styled.button<{ selected: boolean }>`
  width: 332px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.selected ? 'var(--primary)' : 'var(--white)')};
  color: ${(props) => (props.selected ? 'var(--white)' : 'var(--secondary)')};
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.15);
  border-radius: 40px;
  outline: none;
  border: none;
  cursor: pointer;
  margin: 8px 0;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  &:hover {
    border: 2px solid var(--primary);
    transition: 0.3s ease;
  }
`;
