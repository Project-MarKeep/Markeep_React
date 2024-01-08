import React, { useRef, useState } from 'react';
import styles from '../../styles/AddFolder.module.scss';
import Input from '../../components/ui/Input';
import { ReactComponent as Cancel } from '../../assets/icons/x.svg';
import { ReactComponent as Add } from '../../assets/icons/plus.svg';
import { ReactComponent as File } from '../../assets/icons/file-plus.svg';
import Select from 'react-select';
import { multiStyles, toData } from '../../styles/customStyles';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';
import { addFolder } from '../../services/folderApi';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const AddFolder = () => {
  const navigate = useNavigate();

  const initialState = {
    title: '',
    image: null,
    tag: '',
    tags: [],
    isPrivate: false,
  };

  // 폼 데이터
  const [formData, setFormData] = useState(initialState);
  const [src, setSrc] = useState();
  const titleRef = useRef();
  const tagRef = useRef();
  const { title, image, tag, tags, isPrivate } = formData;
  const { setClose } = useOutletContext();

  console.log(formData);

  // 데이터 입력 상태 저장
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 입력 삭제 버튼
  const HandleCancelClick = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  // 토글 상태 확인
  const handleToggleChange = (e) => {
    setFormData((prev) => ({ ...prev, isPrivate: e.target.checked }));
  };

  // 태그 입력
  const handleAddClick = (e) => {
    const tagData = toData(tag, tags.length);
    setFormData((prev) => ({ ...prev, tags: [...tags, tagData] }));
    HandleCancelClick(e);
    tagRef.current.focus();
  };
  const handleKeydown = (e) => {
    if (e.key === 'Enter') {
      handleAddClick(e);
    }
  };

  const handleTagChange = (addedTags) => {
    setFormData((prev) => ({ ...prev, tags: addedTags }));
  };

  // 이미지 등록
  const imgRef = useRef();
  const handleImageChange = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSrc(reader.result);
    };
    setFormData((prev) => ({ ...prev, image: file }));
  };

  // 폴더 등록
  const handleSubmitClick = () => {
    const folderFormData = new FormData();
    const tagNames = tags.map((tagData) => tagData.label);
    const dto = {
      title: title,
      hideFlag: isPrivate,
      tagName: tagNames,
    };

    const blob = new Blob([JSON.stringify(dto)], { type: 'application/json' });

    folderFormData.append('dto', blob);
    folderFormData.append('folderImage', image);
    try {
      addFolder(folderFormData).then((res) => {
        if (res.status === 200) {
          alert('폴더가 정상적으로 등록되었습니다.');
          setFormData(initialState);
          setSrc();
          navigate('/mypage');
          return;
        }
        alert('폴더 생성에 실패했습니다. 다시 시도해 주세요.');
        setFormData(initialState);
        setSrc();
        navigate('/mypage');
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.wrap}>
      {/* 폴더 이미지 */}
      <label
        className={styles.button}
        htmlFor='image'
      >
        사진 첨부
        <File className={styles.icon} />
      </label>
      <input
        type='file'
        id='image'
        name='image'
        ref={imgRef}
        onChange={handleImageChange}
        accept='image/*'
        style={{ display: 'none' }}
      />
      {/* 프라이빗 토글 */}
      <FormGroup className={styles.private}>
        <FormControlLabel
          control={<Switch />}
          label='Private'
          onChange={handleToggleChange}
        />
      </FormGroup>
      {/* 타이틀 */}
      <div className={styles.title}>
        <Input>
          <input
            id='title'
            type='text'
            name='title'
            placeholder='폴더 이름'
            value={title}
            onChange={handleChange}
            ref={titleRef}
          />
          {title && (
            <div
              className={styles.cancel}
              onClick={HandleCancelClick}
            >
              <Cancel className={styles.icon} />
            </div>
          )}
        </Input>
      </div>

      {/* 태그 */}
      <div className={styles.tag_box}>
        <div className={styles.input_box}>
          <Input>
            <input
              name='tag'
              placeholder='태그 입력'
              onChange={handleChange}
              value={tag}
              onKeyDown={handleKeydown}
              ref={tagRef}
            />

            {/* <div
              className={styles.add}
              onClick={handleAddClick}
            >
              <Add className={styles.icon} />
            </div> */}
            {tag ? (
              <div
                className={styles.cancel}
                onClick={HandleCancelClick}
              >
                <Cancel className={styles.icon} />
              </div>
            ) : null}
          </Input>
        </div>
        <Select
          defaultValue={tags}
          isMulti
          styles={multiStyles(tags)}
          isSearchable={false}
          isClearable={false}
          openMenuOnFocus={false}
          openMenuOnClick={false}
          onChange={handleTagChange}
          value={tags}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
        />
      </div>
      <button
        className={styles.plus}
        onClick={() => setClose(true)}
      >
        취소
      </button>
      <button
        className={styles.plus}
        onClick={handleSubmitClick}
      >
        등록
      </button>
    </div>
  );
};

export default AddFolder;
