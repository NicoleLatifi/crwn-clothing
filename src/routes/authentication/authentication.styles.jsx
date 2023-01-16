import styled from "styled-components";

export const AuthenticationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px auto;
  width: 1000px;

  @media only screen and (max-width: 1200px) {
    align-items: center;
    flex-direction: column;
    width: 510px;
  }
`;
