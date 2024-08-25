import React from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

import {
  FormControl,
  FormLabel
} from "@chakra-ui/react";

export default function Home(): React.ReactElement {
  return (
    <div className="flex justify-center items-center">
      <section className="size-96 outline outline-zinc-900 bg-gray-800 rounded-large p-10">
        <FormControl className="space-y-2 flex flex-col">
          <FormLabel className="font-bold flex justify-center"><h1>Login</h1></FormLabel>
          
          <Input type="email" label="Email" className="max-w-xs" />

          <Input type="password" label="Password" className="max-w-xs" />

          <Button type="submit" className="max-w-xs">
            Submit
          </Button>
        </FormControl>
      </section>
    </div>
  );
}
