import { useEffect, useState } from 'react'
import { FC } from 'react'
import Layout from '../../components/Layout/Layout'
import s from '../../styles/product.module.css'
import Image from 'next/image'
import { HiStar as StarIcon } from 'react-icons/hi'
import { IoClose as CloseButton } from 'react-icons/io5'
import { ApiSellerListItem } from '../../api/entities'
import SellerItem from '../../components/Seller/SellerItem'
import { AiOutlineDislike as DislikeIcon } from 'react-icons/ai'
import { AiOutlineLike as LikeIcon } from 'react-icons/ai'
import { GoCommentDiscussion as CommentsIcon } from 'react-icons/go'
import { MdOutlineFeaturedPlayList as FeaturesIcon } from 'react-icons/md'
import { MdOutlineDescription as DescriptionIcon } from 'react-icons/md'

const Product: FC = () => {
  const [info, setInfo] = useState<{
    name: string
    description: string
    rate: number
  }>({
    name: 'قهوه مشتی قهوه ای رنگ',
    description:
      'نشتسای نشاسینشتسای نشتایسنتشای نشاسینتشاسین تاشنتیاس نتشای نتشاسین تشاسین تاشسنیا نشتسایتا تسایشتسای نات',
    rate: 4.3,
  })
  const [price, setPrice] = useState(120000)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sellers, setSellers] = useState<ApiSellerListItem[]>()
  const [features, setFeatures] = useState<
    {
      key: string
      value: string
    }[]
  >()
  const [comments, setComments] = useState<
    {
      _id: string
      customerName: string
      customerRate: number
      text: string
      date: string
      votes: number
    }[]
  >([
    {
      _id: '123asf',
      customerName: 'ممد',
      customerRate: 4.2,
      text: 'شنسیتمش تشمهستیخشهت سخهشتسخیهتش شنسیتمش تشمهستیخشهت سخهشتسخیهتش مشنسیتمش تشمهستیخشهت سخهشتسخیهتشخهسیتختخشهستیخه شتسخیهتشخهستیخ',
      date: '',
      votes: 14,
    },
    {
      _id: '123asf123',
      customerName: 'ممد',
      customerRate: 4.6,
      text: 'مشنسیتمش تشمهستیخشهت سخهشتسخیهتشخهسیت شنسیتمش تشمهستیخشهت سخهشتسخیهتش شنسیتمش تشمهستیخشهت سخهشتسخیهتش ختخشهستیخه شتسخیهتشخهستیخ',
      date: '',
      votes: 14,
    },
  ])

  useEffect(() => {
    const fetch = async () => {
      //get features from api
      setFeatures([
        {
          key: '۱ویژگی',
          value: 'مقدار',
        },
        {
          key: '۲ویژگی',
          value: 'مقدار',
        },
        {
          key: '۳ویژگی',
          value: 'مقدار',
        },
        {
          key: '۴ویژگی',
          value: 'مقدار',
        },
        {
          key: '۵ویژگی',
          value: 'مقدار',
        },
        {
          key: '۶ویژگی',
          value: 'مقدار',
        },
        {
          key: '۷ویژگی',
          value: 'مقدار',
        },
        {
          key: '۸ویژگی',
          value: 'مقدار',
        },
        {
          key: '۹ویژگی',
          value: 'مقدار',
        },
        {
          key: '۱۰ویژگی',
          value: 'مقدار',
        },
        {
          key: '۱۱ویژگی',
          value: 'مقدار',
        },
      ])
    }
    fetch()
  }, [])

  const openModalHandler = () => {
    //get list of sellers
    const data = [
      {
        storageItem: 'asdga12',
        quantity: 6,
        price: 100000,
        sellerName: 'ممدکالا',
        sellerRate: 4.9,
      },
      {
        storageItem: 'asdg42a',
        quantity: 3,
        price: 120000,
        sellerName: 'عباس کالا',
        sellerRate: 4.3,
      },
      {
        storageItem: '1asdga23',
        quantity: 1,
        price: 220000,
        sellerName: 'شمشیری',
        sellerRate: 4.1,
      },
    ]
    setSellers(data)
    setIsModalOpen(true)
  }

  const closeModalHandler = () => {
    setIsModalOpen(false)
  }

  return (
    <Layout>
      <div className={s.flex}>
        <div className={s.picture}>
          <div className={s['image-wrapper']}>
            <Image
              src='/images/coffee.jpg'
              alt='coffee'
              style={{ width: '100%', height: 'auto' }}
              width={0}
              height={0}
              sizes='100vw'
            />
          </div>
        </div>
        <div className={s.name}>{info.name}</div>
        <div className={s.bottom}>
          <div className={s['rate-box']}>
            <div className={s.star}>
              <StarIcon style={{ fontSize: '16px', color: '#f9bc00' }} />
            </div>
            <div className={s.rate}>{info.rate}</div>
          </div>
          <div className={s['price-box']}>
            <div className={s.unit}>تومان</div>
            <div className={s.price}>{price}</div>
          </div>
        </div>
        <div className={s.cart}>
          <div className={s['button-wrapper']}>
            <div className={s.button} onClick={openModalHandler}>
              افزودن به سبد خرید
            </div>
          </div>
          <div className={isModalOpen ? s['modal-open'] : s['modal-closed']}>
            <div className={s['modal-top']}>
              <div className={s['close-modal']}>
                <span
                  className={s['close-modal-button']}
                  onClick={closeModalHandler}
                >
                  <CloseButton style={{ fontSize: '28px' }} />
                </span>
              </div>
              <span className={s['modal-label']}>فروشندگان</span>
            </div>
            <div className={s['modal-list']}>
              {sellers ? (
                sellers.map(seller => {
                  return (
                    <SellerItem
                      key={seller.storageItem}
                      storageItem={seller.storageItem}
                      price={seller.price}
                      sellerName={seller.sellerName}
                      sellerRate={seller.sellerRate}
                    />
                  )
                })
              ) : (
                <div className={s['modal-alter']}>
                  <span className={s['modal-alter-text']}>
                    فروشنده ای برای این محصول پیدا نشد!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={s['description-box']}>
          <div className={s.title}>معرفی</div>
          <div className={s.description}>{info.description}</div>
        </div>
        <div className={s.features}>
          <div className={s.title}>مشخصات</div>
          <div className={s['features-list']}>
            {features
              ? features.map(feature => {
                  return (
                    <div className={s.feature} key={feature.key}>
                      <div className={s['feature-key']}>{feature.key}</div>
                      <div className={s['feature-value']}>{feature.value}</div>
                    </div>
                  )
                })
              : null}
          </div>
        </div>
        <div className={s.comments}>
          <div className={s.title}>دیدگاه ها</div>
          <div className={s['comments-list']}>
            {comments
              ? comments.map(comment => {
                  return (
                    <div className={s.comment} key={comment._id}>
                      <div className={s['comment-top']}>
                        <div className={s['comment-customer']}>
                          {comment.customerName}
                        </div>
                        <div className={s['comment-rate']}>
                          {comment.customerRate}
                        </div>
                      </div>
                      <div className={s['comment-main']}>{comment.text}</div>
                      <div className={s['comment-bottom']}>
                        <div className={s['comment-date']}></div>
                        <div className={s['comment-label']}>
                          آیا این دیدگاه مفید بود؟
                        </div>
                        <div className={s['comment-vote-box']}>
                          <div className={s['vote-icon']}>
                            <LikeIcon style={{ fontSize: '14px' }} />
                          </div>
                          <div className={s['vote']}>{comment.votes}</div>
                          <div className={s['vote-icon']}>
                            <DislikeIcon style={{ fontSize: '14px' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              : null}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Product
