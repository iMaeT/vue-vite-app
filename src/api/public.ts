import { fetch } from '@/axios-config/axios'

const baseUrl = '/api/base'

// 包含学校的组织机构树形结构
export const fetchOrganizationList = ({ params }: PropsData) => {
  return fetch({
    url: `${baseUrl}/organization/tree-school`,
    method: 'get',
    params
  })
}

// 获取学校年级
export const fetchGradeList = ({ params }: PropsData) => {
  return fetch({
    url: `${baseUrl}/school/grade`,
    method: 'get',
    params
  })
}

// 获取学校班级
export const fetchClazzList = ({ params }: PropsData) => {
  return fetch({
    url: `${baseUrl}/clazz`,
    method: 'get',
    params
  })
}

// 学校当前学年学期
export const fetchSemesterExamYear = ({ params }: PropsData) => {
  return fetch({
    url: `${baseUrl}/school/current-exam-year-semester`,
    method: 'get',
    params
  })
}
