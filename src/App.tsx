import { useForm } from "react-hook-form";
import "./App.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function App() {
  const schema = z
    .object({
      name: z.string().max(20, ""),
      password: z
        .string()
        .min(6, "Minimum password 6 characters")
        .max(12, "Maximun password 12 characters"),
      confirmPassword: z.string(),
      qtd: z.preprocess((a) => parseInt(z.string().parse(a)), z.number().int()),
      url: z.string().optional().or(z.string().url("Url invalid")),
      role: z.enum(["admin", "user"]),
    })
    .refine(({ password, confirmPassword }) => password == confirmPassword, {
      message: "password must be at least",
      path: ["confirmPassword"],
    });
  type FormProps = z.infer<typeof schema>;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormProps>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  const handleForm = (data: FormProps) => {
    console.log("certo");
    console.log({ data });
    console.log(errors);
  };
  return (
    <>
      <h1 className="title">Form with zod</h1>
      <form onSubmit={handleSubmit(handleForm)} className="form">
        <div className="form-imput">
          <label>Name:</label>
          <input {...register("name")} type="text" placeholder="your name" />
          {errors.name?.message && (
            <span className="erros">{errors.name?.message}</span>
          )}
        </div>
        <div className="form-imput">
          <label>Password:</label>
          <input
            {...register("password")}
            type="password"
            placeholder="your password"
          />
          {errors.password?.message && (
            <span className="erros">{errors.password?.message}</span>
          )}
        </div>
        <div className="form-imput">
          <label>Repeat the senha:</label>
          <input
            {...register("confirmPassword")}
            type="password"
            placeholder="repeat your password"
          />
          {errors.confirmPassword?.message && (
            <span className="erros">{errors.confirmPassword?.message}</span>
          )}
        </div>
        <div className="form-imput">
          <label>Quantity:</label>
          <input {...register("qtd")} placeholder="quantity" />
          {errors.qtd?.message && (
            <span className="erros">{errors.qtd?.message}</span>
          )}
        </div>
        <div className="form-imput">
          <label>Url:</label>
          <input
            {...register("url")}
            type="url"
            placeholder="url of your website"
          />
          {errors.url?.message && (
            <span className="erros">{errors.url?.message}</span>
          )}
        </div>
        <div className="form-imput">
          <label>Permission:</label>
          <input
            {...register("role")}
            type="text"
            placeholder="Inform permission"
          />
          {errors.role?.message && (
            <span className="erros">{errors.role?.message}</span>
          )}
        </div>
        <button className="button" type="submit">
          Cadastrar
        </button>
      </form>
    </>
  );
}

export default App;
