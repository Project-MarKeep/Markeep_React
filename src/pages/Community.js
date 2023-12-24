import React from "react";
import styles from "../styles/Community.module.scss";
import CardPublic from "../components/CardPublic";

const Community = () => {
  const td = {
    image:
      "https://i.pinimg.com/564x/0d/e0/c0/0de0c0721c576c0e9fbd79abd6668089.jpg",
    profileImg:
      "https://i.pinimg.com/564x/e2/21/f0/e221f0954109ff15ad17ad7d05a1859b.jpg",
    isMarked: true,
    title: "테스트 제목입니다.",
    writer: "chunsik",
    isFollowed: true,
    pin: 234,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.grid}>
          <CardPublic
            image={td.image}
            profileImg={td.profileImg}
            isPinned={td.isPinned}
            title={td.title}
            writer={td.writer}
            isFollowed={td.isFollowed}
            pin={td.pin}
          />
        </div>
        <div className={styles.grid}>
          <CardPublic
            image={td.image}
            profileImg={td.profileImg}
            isPinned={td.isPinned}
            title={td.title}
            writer={td.writer}
            isFollowed={td.isFollowed}
            pin={td.pin}
          />
        </div>
        <div className={styles.grid}>
          <CardPublic
            image={td.image}
            profileImg={td.profileImg}
            isPinned={td.isPinned}
            title={td.title}
            writer={td.writer}
            isFollowed={td.isFollowed}
            pin={td.pin}
          />
        </div>
        <div className={styles.grid}>
          <CardPublic
            image={td.image}
            profileImg={td.profileImg}
            isPinned={td.isPinned}
            title={td.title}
            writer={td.writer}
            isFollowed={td.isFollowed}
            pin={td.pin}
          />
        </div>
        <div className={styles.grid}>
          <CardPublic
            image={td.image}
            profileImg={td.profileImg}
            isPinned={td.isPinned}
            title={td.title}
            writer={td.writer}
            isFollowed={td.isFollowed}
            pin={td.pin}
          />
        </div>
        <div className={styles.grid}>
          <CardPublic
            image={td.image}
            profileImg={td.profileImg}
            isPinned={td.isPinned}
            title={td.title}
            writer={td.writer}
            isFollowed={td.isFollowed}
            pin={td.pin}
          />
        </div>
        <div className={styles.grid}>
          <CardPublic
            image={td.image}
            profileImg={td.profileImg}
            isPinned={td.isPinned}
            title={td.title}
            writer={td.writer}
            isFollowed={td.isFollowed}
            pin={td.pin}
          />
        </div>
        <div className={styles.grid}>
          <CardPublic
            image={td.image}
            profileImg={td.profileImg}
            isPinned={td.isPinned}
            title={td.title}
            writer={td.writer}
            isFollowed={td.isFollowed}
            pin={td.pin}
          />
        </div>
        <div className={styles.grid}>
          <CardPublic
            image={td.image}
            profileImg={td.profileImg}
            isPinned={td.isPinned}
            title={td.title}
            writer={td.writer}
            isFollowed={td.isFollowed}
            pin={td.pin}
          />
        </div>
        <div className={styles.grid}>
          <CardPublic
            image={td.image}
            profileImg={td.profileImg}
            isPinned={td.isPinned}
            title={td.title}
            writer={td.writer}
            isFollowed={td.isFollowed}
            pin={td.pin}
          />
        </div>
        <div className={styles.grid}>
          <CardPublic
            image={td.image}
            profileImg={td.profileImg}
            isPinned={td.isPinned}
            title={td.title}
            writer={td.writer}
            isFollowed={td.isFollowed}
            pin={td.pin}
          />
        </div>
        <div className={styles.grid}>
          <CardPublic
            image={td.image}
            profileImg={td.profileImg}
            isPinned={td.isPinned}
            title={td.title}
            writer={td.writer}
            isFollowed={td.isFollowed}
            pin={td.pin}
          />
        </div>
        <div className={styles.grid}></div>
        <div className={styles.grid}></div>
        <div className={styles.grid}></div>
        <div className={styles.grid}></div>
        <div className={styles.grid}></div>
        <div className={styles.grid}></div>
        <div className={styles.grid}></div>
        <div className={styles.grid}></div>
        <div className={styles.grid}></div>
        <div className={styles.grid}></div>
        <div className={styles.grid}></div>
        <div className={styles.grid}></div>
      </div>
    </div>
  );
};

export default Community;
