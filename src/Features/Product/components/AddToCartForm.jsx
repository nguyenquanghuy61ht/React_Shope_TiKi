import { useForm } from "react-hook-form";
import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@mui/material";
import QuantityField from "Features/Auth/components/QuantityField/index";
import { Typography } from "../../../../node_modules/@mui/material/index";

const schema = yup
  .object()
  .shape({
    quantity: yup.number().required().min(0),
  })
  .required();
function AddToCartForm({ onSubmit, error }) {
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      quantity: "1",
    },
  });

  const handleSubmits = (value) => {
    if (onSubmit) onSubmit(value);
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmits)}>
      <QuantityField name="quantity" label="Quantity" form={form} />
      {error && <Typography sx={{ml:"14px",color:"red"}} variant="body2">Bạn chưa nhập số lượng!</Typography>}
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 2, marginBottom: "15px", width: "300px" }}
        fullWidth
        color="primary"
        size="large"
      >
        Add to card
      </Button>
    </form>
  );
}

export default AddToCartForm;
