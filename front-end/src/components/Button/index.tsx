type ButtonProps = {
  title: string
  variant?: 'default' | 'outline'
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ title, variant = 'default', ...props }: ButtonProps) => {
  const buttonVariant = () => {
    if (variant === 'default') {
      return 'w-full cursor-pointer rounded-md border-2 border-[#c92a0e] bg-[#c92a0e] py-2 text-sm font-bold text-white'
    } else {
      return 'w-full cursor-pointer rounded-md border-2 border-white bg-white py-2 text-sm font-bold text-[#c92a0e]'
    }
  }

  return (
    <button {...props} className={buttonVariant()}>
      {title}
    </button>
  )
}

export default Button
