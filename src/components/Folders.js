import React from "react";
import styles from "../styles/Folders.module.scss";
import CardPrivate from "./CardPrivate";

const Folders = () => {
  const folderList = [];

  for (let i = 0; i <= 10; i++) {
    const f = {
      id: i,
      title: `Title ${i}`,
      url: "https://i.pinimg.com/564x/3a/fc/8e/3afc8ededa44767865d31be064282c31.jpg",
      tags: ["태그1", "태그2", "태그3", "태그4", "태그5"],
      isPrivate: false,
    };

    if (i % 2 === 1) {
      f.isPrivate = true;
    }

    console.log(f);
    folderList.push(f);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.group}>
        <h3>Public Folders</h3>
        <div className={styles.folders}>
          {folderList
            .filter((f) => !f.isPrivate)
            .map((f) => {
              return (
                <CardPrivate
                  id={f.id}
                  title={f.title}
                  url={f.url}
                  tags={f.tags}
                />
              );
            })}
        </div>
      </div>
      <div className={styles.group}>
        <h3>Private Folders</h3>
        <div className={styles.folders}>
          {folderList
            .filter((f) => f.isPrivate)
            .map((f) => {
              return (
                <CardPrivate
                  id={f.id}
                  title={f.title}
                  url={f.url}
                  tags={f.tags}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Folders;
