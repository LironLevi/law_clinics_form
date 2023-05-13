import Image from "next/image";
import Link from 'next/link'
import data from "../data.json"


export default function FirstPage({children}) {
    const posts = data['posts']

    return (
      <div id="first_page">
        <div id="first_page-right">
            <div className="content">
                <Image
                    id="image-first_page"
                    alt="logo"
                    src="/logo.png"
                    width="228"
                    height="82"
                />
                <div className="black-background">מבזקי קליניקות</div>
                <div>
                    {posts.map(post =>
                    <div key={post.id}>
                        <p>{post.content}</p>
                    </div>)}
                    <br></br>
                    <p><Link id="clinics-website" target="_blank" href="https://clinicallec.huji.ac.il/book/%D7%9E%D7%99%D7%93%D7%A2%D7%95%D7%9F-%D7%95%D7%9E%D7%91%D7%96%D7%A7%D7%99-%D7%A7%D7%9C%D7%99%D7%A0%D7%99%D7%A7%D7%95%D7%AA">למידע נוסף</Link></p>
                </div>
            </div>
        </div>
        <div id="first_page-left">
            <div className="content">{children}</div>
        </div>
      </div>
  );
  }
 