import styled from "styled-components";

export const ToolsStyled = styled.div`
  height: 20px;
  margin-bottom: 8px;
  display: flex;
  align-items: flex-start;
`;

type ToolButtonProp = {
  isActive: boolean;
};
export const ToolButton = styled.button<ToolButtonProp>`
  background-color: ${(p) => (p.isActive ? "var(--active)" : "var(--lies)")};
  color: ${(p) => (p.isActive ? "var(--main)" : "#000")};
  border: none;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
