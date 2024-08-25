import React from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";

export default function Home(): React.ReactElement {
  return (
    <div className="flex justify-center items-center">
      <section className="size-96 outline outline-zinc-900 bg-gray-800 rounded-large p-20">
        <FormControl
          isRequired
          className="flex flex-col justify-center items-center text-black space-y-2"
        >
          <FormLabel className="text-white">Topic</FormLabel>
          <Input placeholder="Topic" />
          <Textarea placeholder="Message" />

          <Button
            size="md"
            height="48px"
            width="200px"
            border="2px"
            borderColor="green.500"
            type="submit"
            className="text-white outline"
          >
            Submit
          </Button>
        </FormControl>
      </section>
    </div>
  );
}
