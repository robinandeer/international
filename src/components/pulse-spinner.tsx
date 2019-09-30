import styled from "styled-components";
import { Box } from "grommet";

export const PulseSpinner = styled(Box)`
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 100%;
  animation: pulseScaleOut 1s infinite ease-in-out;

  @-webkit-keyframes pulseScaleOut {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 0;
    }
  }

  @keyframes pulseScaleOut {
    0% {
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    100% {
      -webkit-transform: scale(1);
      transform: scale(1);
      opacity: 0;
    }
  }
`;

export default PulseSpinner;
