import React from 'react'
import { Box, Text, Button } from '@chakra-ui/react'
import { executeCode } from '../api';
import { useState} from 'react';
import { useToast } from '@chakra-ui/react';



export const Output = ({editorRef, language}) => {
    const toast = useToast()
const [output, setOutput] = useState(null)
const [isloading, setIsLoading] = useState(false)
const [isError, setIsError] = useState(false)


    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        try {
            setIsLoading(true)
            const {run: result} = await executeCode(language, sourceCode);
            setOutput(result.output.split('\n'));
            result.stderr ? setIsError(true) : setIsError(false)
        } catch (error) {
            console.log(error)
            toast({
                title:'An error occured',
                description: error.message || "unable to run the code",
                status: 'error',
                duration: 6000,
            })
        } finally {
            setIsLoading(false);
        } 
    }
  return (
    <Box> 
        <Text mb={4} fontSize='lg'>Output</Text>
        <Button
        isLoading = {isloading}
        variant="solid"
        colorScheme="green"
        mb={4}
        onClick={runCode}
        >Run Code</Button>

        <Box
        height='75vh'
        p={2}
        color={
            isError ? 'red.400' : ''
        }
        border='1px solid'
        borderRadius={4}
        borderColor = {
            isError ? 'red.500' : '#333'
        }>
            {output ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'
          }
        </Box>
    </Box> 
  )
}
