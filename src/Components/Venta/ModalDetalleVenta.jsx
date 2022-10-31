import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { parseCurrency, dateFormatter } from "../../Utils/Utils";
import { Card, CardContent, Divider } from "@mui/material";
import { Box } from "@mui/system";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        width: "500px",
        display: "flex",
        justifyContent: "center",
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const ModalDetalleVenta = ({ venta, open, handleClose }) => {
  return (
    <div>
      {venta.id ? (
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Venta N° {venta.id}
          </BootstrapDialogTitle>

          <DialogContent dividers>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography gutterBottom>
                Fecha: {dateFormatter(venta.fecha)}
              </Typography>
              <Typography gutterBottom>
                Vendedor:{" "}
                {venta.vendedor.nombre + " " + venta.vendedor.apellido}
              </Typography>
            </Box>
            <Divider />
            <Typography sx={{ mt: 1 }} variant="h6" component="div">
              Datos del cliente
            </Typography>
            <Card
              variant="outlined"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                mb: 1,
              }}
            >
              <CardContent
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body1" component="div" gutterBottom>
                    Nombre:{" "}
                    {venta.cliente.nombre + " " + venta.cliente.apellido}
                  </Typography>

                  <Typography variant="body1" component="div" gutterBottom>
                    Email: {venta.cliente.email}
                  </Typography>
                </Box>
                <Divider />

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body1" component="div" gutterBottom>
                    Telefono: {venta.cliente.telefono}
                  </Typography>
                  <Typography variant="body1" component="div" gutterBottom>
                    DNI: {venta.cliente.dni}
                  </Typography>
                </Box>
                <Divider />

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body1" component="div" gutterBottom>
                    Provincia:{" "}
                    {venta.cliente.direccion.localidad.provincia.nombre}
                  </Typography>

                  <Typography variant="body1" component="div" gutterBottom>
                    Localidad: {venta.cliente.direccion.localidad.nombre}
                  </Typography>
                </Box>
                <Divider />

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body1" component="div" gutterBottom>
                    Dirección:{" "}
                    {venta.cliente.direccion.calle +
                      " " +
                      venta.cliente.direccion.numero}
                  </Typography>
                </Box>
                <Divider />
              </CardContent>
            </Card>
            <Typography variant="h6" component="div">
              Detalle del vehiculo
            </Typography>
            <Card
              variant="outlined"
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body1" component="div" gutterBottom>
                    Marca: {venta.vehiculo.modelo.marca.nombre}
                  </Typography>
                  <Typography variant="body1" component="div" gutterBottom>
                    Modelo: {venta.vehiculo.modelo.nombre}
                  </Typography>
                  <Typography variant="body1" component="div" gutterBottom>
                    Año: {venta.vehiculo.anio}
                  </Typography>
                </Box>
                <Divider />

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body1" component="div" gutterBottom>
                    Tipo vehículo: {venta.vehiculo.modelo.tipoVehiculo.nombre}
                  </Typography>
                  <Typography variant="body1" component="div" gutterBottom>
                    Pais: {venta.vehiculo.modelo.marca.pais.nombre}
                  </Typography>
                </Box>
                <Divider />

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body1" component="div" gutterBottom>
                    P. Compra: {parseCurrency(venta.vehiculo.precioCompra)}
                  </Typography>
                  <Typography variant="body1" component="div" gutterBottom>
                    P. Venta: {parseCurrency(venta.vehiculo.precioVenta)}
                  </Typography>
                </Box>
                <Divider />
              </CardContent>
            </Card>
            <Typography variant="h6" component="div">
              Detalle del total
            </Typography>
            <Card
              variant="outlined"
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <CardContent>
                <Typography
                  variant="body2"
                  component="div"
                  color="text.secondary"
                >
                  Cant. Vehículos: {venta.cantidadVehiculos}
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  color="text.secondary"
                >
                  P. Unitario: {parseCurrency(venta.precioUnitario)}
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  color="text.secondary"
                >
                  Subtotal:{" "}
                  {parseCurrency(
                    venta.precioUnitario * venta.cantidadVehiculos
                  )}
                </Typography>
                <Typography
                  variant="body2"
                  component="div"
                  color="text.secondary"
                >
                  Impuestos ({venta.impuestoPorcentaje}%):{" "}
                  {parseCurrency(venta.impuestoPesos)}
                </Typography>
                <Typography variant="body1" component="div">
                  Total:{" "}
                  {parseCurrency(
                    venta.precioUnitario * venta.cantidadVehiculos +
                      venta.impuestoPesos
                  )}
                </Typography>
              </CardContent>
            </Card>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cerrar
            </Button>
          </DialogActions>
        </BootstrapDialog>
      ) : null}
    </div>
  );
};

export default ModalDetalleVenta;
