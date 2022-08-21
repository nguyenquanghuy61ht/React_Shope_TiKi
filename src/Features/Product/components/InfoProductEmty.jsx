import { ImageListItem, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";
import WarningIcon from "@mui/icons-material/Warning";
import React from "react";
function InfoProductEmty() {
  const useStyle = makeStyles((theme) => ({
    root: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
    },
    img: {
      width: "300px",
      margin: "auto",
    },
    message: {
      padding: "10px",
      margin: "4% 17% 0 17%",
      color:"#FF3300",
      border: "1px solid #FF3300",
      display:"flex",
      justifyContent:"center",
      alignItems:"center"

    },
    icon:{
        marginRight:"7px",
        marginBottom:"3px"
    }
  }));
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <ImageListItem variant="woven" className={classes.img}>
        <img
          src={
            "https://media.istockphoto.com/vectors/no-search-results-page-not-found-concept-vector-id1191902083?k=20&m=1191902083&s=170667a&w=0&h=_I1HoWtfMv45Ao2OYUcFsE3f7c5WGFOSnmqfSbJP6Kc="
          }
          srcSet={
            "https://media.istockphoto.com/vectors/no-search-results-page-not-found-concept-vector-id1191902083?k=20&m=1191902083&s=170667a&w=0&h=_I1HoWtfMv45Ao2OYUcFsE3f7c5WGFOSnmqfSbJP6Kc="
          }
          alt={"err"}
          loading="lazy"
        />
      </ImageListItem>
      <Box component="span" className={classes.message}>
        <WarningIcon className={classes.icon} />
        <Typography>
          Rất tiếc! không có sản phẩm nào mà bạn đang tìm kiếm.
        </Typography>
      </Box>
    </Box>
  );
}

export default InfoProductEmty;
