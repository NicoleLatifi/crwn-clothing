import DirectoryItem from "../directory-item/directory-item.component";

import { DirectoryContainer } from "./directory.styles.jsx";

const Directory = ({ categories }) => {
  return (
    <DirectoryContainer className="directory-container">
      {categories.map((category) => {
        return <DirectoryItem category={category} key={category.id} />;
      })}
    </DirectoryContainer>
  );
};

export default Directory;
