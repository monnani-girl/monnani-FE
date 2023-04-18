import { ChangeEvent, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { selectedAtom } from '../atoms';
import camera from '../assets/camera.png';
import styled from 'styled-components';

interface ImageFileUploadProps {
  onClickButton: () => void;
}

const ImageFileUpload = ({ onClickButton }: ImageFileUploadProps) => {
  const [imageSrc, setImageSrc] = useState('');
  const setSelectedState = useSetRecoilState(selectedAtom);
  const inputRef = useRef(null);

  const handleUploadClick = () => {
    if (inputRef.current) {
      (inputRef.current as any).click();
    }
  };

  const encodeFileToBase64 = (fileObj: File) => {
    return new Promise(() => {
      const reader = new FileReader();
      reader.readAsDataURL(fileObj);
      reader.onload = () => {
        setImageSrc(reader.result as string);
        const encoded = (reader.result as string).split(',')[1];
        setSelectedState((prev) => ({ ...prev, photo: encoded }));
      };
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      currentTarget: { files },
    } = e;

    if (files) {
      encodeFileToBase64(files[0]);
    } else {
      //TODO: 에러 처리
      alert('이미지를 업로드하는 데 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <label htmlFor="image">
        <FileInput
          type="file"
          id="image"
          accept="image/*"
          name="file"
          ref={inputRef}
          onChange={handleImageChange}
        />
        {imageSrc ? (
          <Image src={imageSrc} alt="uploaded-file" />
        ) : (
          <FileSelctButton onClick={handleUploadClick}>
            <CameraImg src={camera} alt="camera" />
            <br />
            얼굴이 잘리지 않은 <br />
            사진을 올려주세요
          </FileSelctButton>
        )}
      </label>
      <FindButton onClick={onClickButton} disabled={Boolean(!imageSrc)}>
        닮은꼴 찾기
      </FindButton>
    </>
  );
};

export default ImageFileUpload;

const FileInput = styled.input`
  display: none;
`;

const CameraImg = styled.img`
  width: 32px;
  margin-bottom: 14px;
`;

const FileSelctButton = styled.button`
  width: 198px;
  height: 198px;
  background-color: var(--white);
  color: var(--darkgrey);
  line-height: 21px;
  border: 1px solid #e1e1e1;
  border-radius: 20px;
  box-shadow: 3px 3px 5px #e1e1e1;
  font-family: 'Noto Sank KR';
  font-size: 16px;
  font-weight: 400;
  margin-top: 96px;
  cursor: pointer;
`;

const FindButton = styled.button<{ disabled: boolean }>`
  width: 284px;
  height: 72px;
  font-family: 'Gmarket Sans';
  font-size: 24px;
  margin-top: 40px;
  color: var(--white);
  background-color: var(--primary);
  border-radius: 100px;
  border: none;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`;

const Image = styled.img`
  width: 198px;
  height: 198px;
  border-radius: 20px;
  margin-top: 96px;
  box-shadow: 3px 3px 5px #e1e1e1;
`;
