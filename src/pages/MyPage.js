import styles from "../styles/Mypage.module.scss";
import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import { ReactComponent as Cancel } from "../assets/icons/x.svg";
import Folders from "../components/folder/Folders";
import Select from "react-select";
import { colors, customStyles } from "../styles/customStyles";
import { useInput } from "../hoc/useInput";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteFolder } from "../services/folderApi";

const MyPage = () => {
  const [search, setSearch] = useState("");
  const [option, setOption] = useState("all");
  const [checked, setChecked] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // 검색
  const handleClick = () => {
    setSearch(keyword);
    inputRef.current.blur();
  };

  const {
    inputRef,
    keyword,
    handleInputChange,
    HandleCancelClick,
    handleKeyDown,
  } = useInput("", handleClick);

  // 폴더 분류
  const options = [
    { value: "all", label: "All" },
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
  ];

  const handleSelectChange = (e) => {
    setOption(e?.value);
  };

  // 폴더 삭제
  const handleCancleClick = (e) => {
    console.log("잘 왔나 확인", checked);
    deleteFolder(checked).then((res) => {
      if (res.status === 200) {
        alert("폴더가 삭제되었습니다.");
        setChecked([]);
        navigate("/mypage");
        return;
      }
      alert("폴더 삭제에 실패했습니다. 다시 시도해 주세요.");
      setChecked([]);
    });
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2>My Folder List</h2>
        <div className={styles.box}>
          <div className={styles.input_box}>
            <input
              placeholder="내 폴더 검색"
              onChange={handleInputChange}
              value={keyword}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
            {keyword ? (
              <div className={styles.cancel} onClick={HandleCancelClick}>
                <Cancel className={styles.icon} />
              </div>
            ) : null}
            <div className={styles.search} onClick={handleClick}>
              <SearchIcon className={styles.icon} />
            </div>
          </div>
          <div className={styles.buttons}>
            <Link
              to={"/view/public/folders/add"}
              state={{ previousLocation: location }}
            >
              추가
            </Link>
            <button onClick={handleCancleClick}>삭제</button>
          </div>
          <Select
            id="select"
            defaultValue={{ value: "all", label: "All" }}
            options={options}
            onChange={handleSelectChange}
            maxMenuHeight={"160px"}
            styles={customStyles}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,

                neutral20: "rgba(187, 180, 254, 0.4)",
                primary: colors.purple,
                neutral80: colors.white,
                neutral60: colors.blue,
              },
            })}
          />
        </div>
      </div>
      <div className={styles.content}>
        <Folders option={option} keyword={search} setChecked={setChecked} />
      </div>
    </div>
  );
};

export default MyPage;
