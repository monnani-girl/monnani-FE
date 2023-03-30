import styled from "styled-components";
import { FormEvent } from 'react';
import { useRecoilState } from "recoil";
import { firstState } from "../../atoms";

const FirstStep = () => {
    const [firstSelected, setFirstSelected] = useRecoilState<string>(firstState);
    const handleSelectItem = (e: FormEvent<HTMLButtonElement>) => {
        const {
          currentTarget: { value },
        } = e;
        setFirstSelected(value);
    };

    return (
        <>
        <SubTitle>일주일 간 제주로 여행을 떠난다면...</SubTitle>
        <Title>어떤 계절에 떠나시겠어요?</Title>
        <SelectContainer>
          <SelectItem
            id="1"
            value="spring"
            onClick={handleSelectItem}
            selected={firstSelected === 'spring'}
          >
            왕벚꽃이 펼쳐진 따뜻한 봄의 제주
          </SelectItem>
          <SelectItem
            id="2"
            value="summer"
            onClick={handleSelectItem}
            selected={firstSelected === 'summer'}
          >
            에너지가 넘치는 여름의 제주
          </SelectItem>
          <SelectItem
            id="3"
            value="fall"
            onClick={handleSelectItem}
            selected={firstSelected === 'fall'}
          >
            감성 넘치는 단풍이 있는 가을의 제주
          </SelectItem>
          <SelectItem
            id="4"
            value="winter"
            onClick={handleSelectItem}
            selected={firstSelected === 'winter'}
          >
            한 해를 마무리하는 연말 겨울의 제주
          </SelectItem>
        </SelectContainer>
        </>
    );
}

export default FirstStep;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #525463;

  font-family: 'Gmarket Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  margin-top: 48px;
`;

const Title = styled.div`
  font-family: Gmarket Sans;
  font-size: 24px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  text-align: center;
  margin: 10px 0 59px 0;

  color: #000000;
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
  background: ${(props) => (props.selected ? '#379100' : '#fff')};
  color: ${(props) => (props.selected ? '#fff' : '#001358')};
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.15);
  border-radius: 40px;
  outline: none;
  border: none;
  cursor: pointer;
  margin: 16px 0;
  font-family: 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;

  &:hover {
    border: 2px solid #379100;
  }
`;