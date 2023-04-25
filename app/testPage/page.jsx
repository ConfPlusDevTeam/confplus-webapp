import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import ContentContainer from "../components/ContentContainer/ContentContainer";

export default function page() {
  return (
    <ContentContainer variant={1} title="Test">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed similique
      nisi maxime suscipit et numquam repudiandae aut, architecto veniam eveniet
      blanditiis ex, voluptas fugiat laboriosam assumenda illo illum debitis
      fuga?
    </ContentContainer>
  );
}
