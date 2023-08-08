import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from "react-dom/client";

import { RapidApplication } from "@rapid/sdk/lib/ui";

import "@radix-ui/colors/slate.css";
import "@radix-ui/colors/slateDark.css";
import "@radix-ui/colors/blue.css";
import "@radix-ui/colors/grass.css";
import "@radix-ui/colors/amber.css";
import "@radix-ui/colors/red.css";
import "@radix-ui/colors/blueDark.css";
import "@radix-ui/colors/grassDark.css";
import "@radix-ui/colors/amberDark.css";
import "@radix-ui/colors/redDark.css";

import "@rapid/sdk/css/sdk.css";
import Container from './components/container';
import '../src/Assets/css/style.css';

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <RapidApplication
    subRoutes={[
      {
        id: "app",
        path: "",
        element: <Container />,
      }
    ]}
  />
);
