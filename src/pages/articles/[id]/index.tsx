import { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { Box, Text, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import { DefaultLayout } from 'src/components/layout/DefaultLayout'
import { MainLayout } from 'src/components/layout/MainLayout'
import { Articles } from 'src/components/page/articles/Articles'
import { ArticleType } from 'types'
import { TagType } from 'types'
import { ApiKey } from 'utils/api-key'
import { RightSideBar } from 'src/components/molecules/RightSideBar'
import { Contents } from 'src/components/page/articles/contents'
import axios from 'axios'

type props = {
  article: ArticleType
  tags: TagType[]
}

const App: NextPage<props> = ({ article, tags }) => {
  return (
    <>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DefaultLayout>
        <MainLayout>
          <Flex
            flexDirection="column"
            maxW={{ sm: '100%', md: '100%', lg: '750px' }}
            w="100%"
            mb={{ sm: '32px' }}
          >
            <Contents article={article} />
          </Flex>
          <RightSideBar tags={tags} />
        </MainLayout>
      </DefaultLayout>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const key = ApiKey()
  const id = context?.params?.id as string
  const resArticles = await fetch(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/articles?id[equals]${id}`,
    key,
  )

  const articles = await resArticles.json()

  const resTags = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/tags`, key)
  const tags = await resTags.json()

  return {
    props: {
      article: articles.contents[0],
      tags: tags.contents,
    },
  }
}

type articleReturnType = {
  contents: {
    id: string
  }[]
  totalCount: number
  offset: number
  limit: number
}

export const getStaticPaths: GetStaticPaths = async () => {
  const key = ApiKey()
  const {
    data: { contents: articles },
  } = await axios.get<articleReturnType>(
    `${process.env.NEXT_PUBLIC_ENDPOINT}/articles?fields=id&limit=9999`,
    key,
  )

  const paths = articles.map((article) => `/articles/${article.id}`)
  return {
    paths,
    fallback: false,
  }
}

export default App
