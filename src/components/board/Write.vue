<template>
    <div>
        <h1>게시판 {{ num ? "수정" : "등록" }}</h1>
        <div class="AddWrap">
            <form>
                <table class="tblAdd">
                    <colgroup>
                        <col width="15%" />
                        <col width="*" />
                    </colgroup>
                    <tr>
                        <th>제목</th>
                        <td><input type="text" v-model="subject" ref="subject"></td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td><textarea v-model="cont" ref="cont"></textarea></td>
                    </tr>
                </table>
            </form>
        </div>

        <div class="btnWrap">
            <a href="javascript:;" @click="fnList" class="btn">목록</a>
            <a v-if="!num" href="javascript:;" @click="fnAddProc" class="btnAdd btn">등록</a>
            <a v-else href="javascript:;" @click="fnModProc" class="btnAdd btn">수정</a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            board_code: 'news',
            subject: '',
            cont: '',
            id: 'admin',
            body: this.$route.query,
            form: '',
            num: this.$route.query.num
        }
    },
    mounted() {
        if (this.num) {
            this.fnGetView();
        } 
    },
    methods: {
        fnList() {
            delete this.body.num;
            this.$router.push({
                path: './list',
                query: this.body
            });
        },
        fnGetView() {
            this.$axios.get("http://localhost:3000/api/board/" + this.body.num, {params: this.body})
            .then((res) => {
                this.view = res.data.view[0];
                this.subject = this.view.subject;
                this.cont = this.view.cont;
            })
            .catch((err) => {
                console.log(err);
            })
        },
        fnView() {
            this.$router.push({
                path: './view',
                query: this.body
            });
        },
        fnAddProc() {
            if (!this.subject) {
                alert("제목을 입력하세요.");
                this.$refs.subject.focus();
                return;
            }

            this.form = {
                board_code: this.board_code,
                subject: this.subject,
                cont: this.cont,
                id: this.id
            }

            this.$axios.post('http://localhost:3000/api/board', this.form)
                .then((res)=> {
                    if (res.data.success) {
                        alert("등록되었습니다.");
                        this.fnList();
                    } else {
                        alert("실행중 실패했습니다.\n다시 이용해 주세요.");
                    }
                })
                .catch((err)=> {
                    console.log(err);
                })
        },
        fnModProc() {
            if (!this.subject) {
                alert("제목을 입력하세요.");
                this.$refs.subject.focus();
                return;
            }

            this.form = {
                board_code: this.board_code,
                subject: this.subject,
                cont: this.cont,
                id: this.id,
                num: this.num
            }

            this.$axios.put("http://localhost:3000/api/board", this.form)
            .then((res) => {
                if (res.data.success) {
                    alert("수정되었습니다.");
                    this.fnView();
                } else {
                    alert("실행중 실패...");
                }
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>
    .tblAdd { border-top: 1px solid #888; }
    .tblAdd th, .tblAdd td {
        border-bottom: 1px solid #EEE;
        padding: 5px 0;
    }
    .tblAdd td {
        padding: 10px 10px;
        box-sizing: border-box;
    }
    .tblAdd td input {
        width: 100%;
        min-height: 30px;
        box-sizing: border-box;
        padding: 0 10px;
    }
    .tblAdd td textarea {
        width: 100%;
        min-height: 300px;
        padding: 10px;
        box-sizing: border-box;
    }
    .btnWrap {
        text-align: center;
        margin: 20px 0 0 0;
    }
    .btnWrap a { margin: 0 10px; }
    .btnAdd { background: #43B984; }
    .btnDelete { background: #F00; }
</style>