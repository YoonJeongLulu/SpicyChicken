import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { useRef } from "react";
import { styled } from "@mui/system";

const CardWrapper = styled(Card)({
  background: "#392418",
});

const Input = styled("input")(({ theme }) => ({
  fontSize: 12,
  fontWeight: 300,
  padding: "10px 12px",
  borderRadius: 5,
  border: "1px solid #555",
  background: "white",
  width: "100%",
  outline: "none",
  cursor: "pointer", 
  color: theme.palette.primary.main,
}));

export default function ReferralLink({ address }) {
  const link = `${window.origin}?ref=${address}`;
  const addrRef = useRef();

  const copyAddr = () => {
    const el = addrRef.current
    el.select()
    document.execCommand("copy")
  }

  return (
    <CardWrapper>
      <CardContent style={{ paddingLeft: 8, paddingRight: 8 }}>
        <Typography gutterBottom variant="h5" textAlign="center" color = "rgb(251 241 225)">
          Referral Link
        </Typography>
        <Input value={address ? link : ""} readOnly ref={addrRef} onClick={() => copyAddr()} />
        <Typography
          textAlign="center"
          variant="body2"
          marginTop={2}
          paddingX={3}
          color = "rgb(251 241 225)"
        >
          Earn 11% of the fee used to raise chickens from anyone who uses your link
          referral link
        </Typography>
      </CardContent>
    </CardWrapper>
  );
}
