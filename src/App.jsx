import React, { useState } from "react";
import {
  Button,
  Container,
  createMuiTheme,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  ThemeProvider,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
  },
  button: {
    height: "100%",
  },
}));

const formats = [
  "jpeg",
  "png",
  "gif",
  "bmp",
  "tiff",
  "eps",
  "WebP",
  "svg",
  "pdf",
  "txt",
];

function App() {
  const classes = useStyles();
  const [format, setFormat] = useState("jpeg");

  const handleSelect = (event) => {
    setFormat(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Paper className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                className={classes.button}
                startIcon={<CloudUpload />}
                variant="contained"
                color="secondary"
                component="label"
              >
                Load Image
                <input accept="image/*" type="file" hidden multiple />
              </Button>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" color="secondary">
                <InputLabel id="format-select-label">Format</InputLabel>
                <Select
                  labelId="format-select-label"
                  id="format-select-label"
                  value={format}
                  onChange={handleSelect}
                  label="Format"
                >
                  {formats.map((format, index) => (
                    <MenuItem key={index} value={format}>
                      {format}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
