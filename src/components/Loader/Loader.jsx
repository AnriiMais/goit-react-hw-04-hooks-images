import React from 'react';
import styled from 'styled-components';
import { Roller } from 'react-awesome-spinners';

const Loader = () => {
  return (
    <FallbackContainer>
      <Roller />
    </FallbackContainer>
  );
};
const FallbackContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate (-50%, -50%);
`;
export default Loader;
