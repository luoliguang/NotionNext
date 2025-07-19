import { InfoCard } from './InfoCard'
import { AnalyticsCard } from './AnalyticsCard'
import CONFIG from '../config'
import dynamic from 'next/dynamic'
import Announcement from './Announcement'
import DateCounter from './DateCounter' // 正确引入DateCounter组件
import { useGlobal } from '@/lib/global'
import Live2D from '@/components/Live2D'
import { siteConfig } from '@/lib/config'

const HexoRecentComments = dynamic(() => import('./HexoRecentComments'))
const FaceBookPage = dynamic(
  () => {
    let facebook = <></>
    try {
      facebook = import('@/components/FacebookPage')
    } catch (err) {
      console.error(err)
    }
    return facebook
  },
  { ssr: false }
)

/**
 * Hexo主题右侧栏
 * @param {*} props
 * @returns
 */
export default function SideRight(props) {
  const {
    post,
    currentCategory,
    categories,
    latestPosts,
    tags,
    currentTag,
    showCategory,
    showTag,
    rightAreaSlot,
    notice,
    className
  } = props

  const { locale } = useGlobal()

  // 文章全屏处理
  if (post && post?.fullWidth) {
    return null
  }

  return (
    <div id='sideRight' className={className}>
      <InfoCard {...props} />
      <DateCounter />
      <Announcement post={notice} />
      {siteConfig('HEXO_WIDGET_ANALYTICS', null, CONFIG) && <AnalyticsCard {...props} />}
      {siteConfig('COMMENT_WALINE_SERVER_URL') &&
        siteConfig('COMMENT_WALINE_RECENT') && <HexoRecentComments />}
      {rightAreaSlot}
      <FaceBookPage />
      <Live2D />
    </div>
  )
}
