import React, {useEffect, useState} from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css';
import PropTypes from "prop-types";

// 注册插件（如果有的话）
// MdEditor.use(YOUR_PLUGINS_HERE);

// 初始化Markdown解析器
const mdParser = new MarkdownIt(/* Markdown-it options */);

const MarkdownEditorLite = props => {
    const {textContent, updateCutInfoParam} = props

    const [tempContent, setTempContent] = useState("")

    useEffect(() => {
        setTempContent(textContent)
    }, [tempContent])
    const onChange = (html, text) => {
        setTempContent(html.text)
    };
    const onBlur = () => {
        updateCutInfoParam("textContent", tempContent)
    };
    return (
        <MdEditor id={"textContent"} style={{height: '500px'}}
                  renderHTML={text => mdParser.render(text)}
                  placeholder={"可以随便记录点什么，单次支持20万字符...\n" +
                      "\n" +
                      "剪贴板只要有效期内有查看或修改则永不过期，将自动延期所设置有效期时长。\n" +
                      "使用后请主动删除剪贴板，避免数据长时间存储造成数据泄露。\n" +
                      "\n" +
                      "系统会自动拦截存在违禁词和敏感词的内容，如有会被误伤的敏感词\n" +
                      "可点击页面底部工具进行编码处理：https://uutool.cn/base64/\n" +
                      "\n" +
                      "请勿上传存储不合法内容，如遇非法剪贴板请及时举报冻结！\n" +
                      "\n" +
                      "举报冻结规则：\n" +
                      "第一次举报：冻结30分钟\n" +
                      "第二次举报：冻结6小时\n" +
                      "第三次举报：冻结一天\n" +
                      "第四次举报：直接删除剪贴板"}
                  value={tempContent}
                  onBlur={onBlur}
                  onChange={onChange}/>
    );
};

MarkdownEditorLite.propTypes = {
    textContent: PropTypes.string,
    updateCutInfoParam: PropTypes.func,
};

export default MarkdownEditorLite;