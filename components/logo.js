import Link from "next/link";
import styles from "styles/logo.module.css"

export default function Logo({ boxOn = false }) {
  return (
    // boxOn属性がtrueなら.boxスタイル、falseなら.basicスタイルを適用
    <Link href="/" className={boxOn ? styles.box : styles.basic}>
      CUBE
    </Link>
  )
}