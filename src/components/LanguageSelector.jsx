import React from 'react'
import { Box, Menu,Button,MenuButton,MenuList,MenuItem,Text } from '@chakra-ui/react'
import {LANGUAGE_VERSIONS} from '../constants'


export const LanguageSelector = ({language , onSelect}) => {
  const languages = Object.entries(LANGUAGE_VERSIONS)

   return (
    <Box  ml={2} mb={4}>
        <Text mb={2} fontSize='lg'>Language:</Text>
        <Menu isLazy>
  <MenuButton as={Button}>
    {language}
  </MenuButton>
  <MenuList bg='#110c1b'>
      {languages.map(([lang, version]) => (
        <MenuItem key={lang}
        color = {
          lang === language ? 'blue.400' : ''
        } 
        bg ={
          lang === language ? 'gray.700' : ''
        }
        _hover ={ {
          color:'blue.400',
          bg:'gray.900'
        }}
         onClick ={()=> onSelect(lang)}>
          {lang}
          &nbsp;
          <Text as='span' color='gray.600' fontSize='sm'>{version}</Text>
        </MenuItem>
      ))}
  </MenuList>
</Menu>
    </Box>
  )
}
 