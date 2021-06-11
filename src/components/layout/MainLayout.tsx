import { Box, Flex } from '@chakra-ui/layout'

export const MainLayout: React.FC = ({ children }) => {
  return (
    <Box minH="100vh" bgColor="bg.gray">
      <Flex maxW="1100px" mx="auto" flexDirection="column">
        <Flex justifyContent="space-around" mt="32px" mx="auto" w="100%">
          {children}
        </Flex>
      </Flex>
    </Box>
  )
}
