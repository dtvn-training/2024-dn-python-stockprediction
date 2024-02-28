import styled from "styled-components";

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 640px;
  gap: 12px;
  border: 1px dashed gray;
  border-radius: 16px;
  padding: 16px 32px;
  margin: 24px auto;
`;

export const AvatarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px;
`;
