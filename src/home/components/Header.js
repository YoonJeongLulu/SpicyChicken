import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Connect from "./Connect";
import logo from "../assets/FullLogo.png";

const Wrapper = styled("div")(({ theme }) => ({
  textAlign: "center",
  paddingBottom: 24,
  [theme.breakpoints.down("md")]: {
    h5: {
      fontSize: 20,
      margin: 0,
    },
  },
}));

export default function Header() {
  return (
    <Wrapper>
      <img src={logo} alt="Spicy Chicken" width={"80%"} height = {"80%"} style={{ marginTop: -15 }} />
      <Connect responsive={false} />
      <Typography variant="h5" marginTop={2}>
        'Raise to Earn'
      </Typography>
      <Typography variant="h6" marginTop={0}>
        BNB Reward Pool
      </Typography>
    </Wrapper>
  );
}
