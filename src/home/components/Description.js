import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";

const Wrapper = styled("div")(({ theme }) => ({
  textAlign: "center",
  paddingTop: 3,
  paddingBottom: 24,
  [theme.breakpoints.down("md")]: {
    h5: {
      fontSize: 15,
      margin: 0,
    },
  },
}));

export default function Description() {
  return (
    <Wrapper>
      <Typography variant="h9">
        <p>Each round begins when <b>1BNB</b> is deposited in the pool.</p>
        <p> More people will participate for the daily reward, and more deposits will be accumulated in the BNB pool.</p>
        <p>However, as the number of new participants decreases naturally and interest is paid to existing participants, the BNB pool will also be reduced. </p>
        <p>If the balance of the BNB pool is less than or equal to <b>0.01BNB</b>, the corresponding round ends, followed by the next new round.</p>
        <p>The BNB pool used a model that could naturally grow and then decrease again depending on game theory without becoming too large. </p>
        <Typography variant="h6"><b>Enjoy the spicy chicken.</b></Typography>
        </Typography>
    </Wrapper>
  );
}
